{-# LANGUAGE BlockArguments #-}

module Main where

import Data.ByteString.Unsafe (unsafePackMallocCStringLen, unsafeUseAsCStringLen)
import Data.Text.Encoding (decodeUtf8, encodeUtf8)
import Foreign.C.Types (CChar)
import Foreign.Marshal.Alloc (mallocBytes)
import Foreign.Marshal.Utils (copyBytes, new)
import Foreign.Ptr (Ptr, castPtr, plusPtr)
import Foreign.Storable (Storable (alignment, peek, poke, sizeOf))
import qualified Nazuki.Main as Nazuki

main :: IO ()
main = mempty

data CompileResult
  = Ok {outputPtr :: Ptr CChar, outputLen :: Int}
  | Err {messagePtr :: Ptr CChar, messageLen :: Int}

instance Storable CompileResult where
  sizeOf _ = 12
  alignment _ = 4
  peek ptr = do
    status <- peek $ castPtr ptr :: IO Int
    case status of
      0 -> do
        outputPtr <- peek $ plusPtr ptr 4
        outputLen <- peek $ plusPtr ptr 8
        return $ Ok outputPtr outputLen
      _ -> do
        messagePtr <- peek $ plusPtr ptr 4
        messageLen <- peek $ plusPtr ptr 8
        return $ Err messagePtr messageLen
  poke ptr value = do
    case value of
      Ok outputPtr outputLen -> do
        poke (castPtr ptr) (0 :: Int)
        poke (plusPtr ptr 4) outputPtr
        poke (plusPtr ptr 8) outputLen
      Err messagePtr messageLen -> do
        poke (castPtr ptr) (1 :: Int)
        poke (plusPtr ptr 4) messagePtr
        poke (plusPtr ptr 8) messageLen

foreign export ccall compile :: Ptr CChar -> Int -> IO (Ptr CompileResult)

compile :: Ptr CChar -> Int -> IO (Ptr CompileResult)
compile inputPtr inputLen = do
  input <- decodeUtf8 <$> unsafePackMallocCStringLen (inputPtr, inputLen)
  case Nazuki.compile input of
    Right output ->
      unsafeUseAsCStringLen (encodeUtf8 output) \(ptr, len) -> do
        outputPtr <- mallocBytes len
        copyBytes outputPtr ptr len
        new $ Ok outputPtr len
    Left error ->
      unsafeUseAsCStringLen (encodeUtf8 error) \(ptr, len) -> do
        messagePtr <- mallocBytes len
        copyBytes messagePtr ptr len
        new $ Err messagePtr len
