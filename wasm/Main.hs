{-# LANGUAGE BlockArguments #-}

module Main where

import Data.ByteString.Unsafe (unsafePackMallocCStringLen, unsafeUseAsCStringLen)
import Data.Text (Text)
import Data.Text.Encoding (decodeUtf8, encodeUtf8)
import Foreign.C.Types (CChar)
import Foreign.Marshal.Alloc (mallocBytes)
import Foreign.Marshal.Utils (copyBytes)
import Foreign.Ptr (Ptr, plusPtr)
import Foreign.Storable (Storable (poke))
import qualified Nazuki.Main as Nazuki

main :: IO ()
main = mempty

type CompileResult = Either Text Text

type CreateBannerResult = Text

receiveText :: Ptr CChar -> Int -> IO Text
receiveText ptr len =
  decodeUtf8 <$> unsafePackMallocCStringLen (ptr, len)

sendText :: Text -> IO (Ptr CChar, Int)
sendText text =
  unsafeUseAsCStringLen (encodeUtf8 text) \(ptr, len) -> do
    ptr' <- mallocBytes len
    copyBytes ptr' ptr len
    return (ptr', len)

sendCompileResult :: CompileResult -> IO (Ptr CompileResult)
sendCompileResult result = do
  ptr <- mallocBytes 12 :: IO (Ptr CompileResult)
  case result of
    Left message -> do
      poke (plusPtr ptr 0) (0 :: Int)
      (messagePtr, messageLen) <- sendText message
      poke (plusPtr ptr 4) messagePtr
      poke (plusPtr ptr 8) messageLen
    Right output -> do
      poke (plusPtr ptr 0) (1 :: Int)
      (outputPtr, outputLen) <- sendText output
      poke (plusPtr ptr 4) outputPtr
      poke (plusPtr ptr 8) outputLen
  return ptr

sendCreateBannerResult :: CreateBannerResult -> IO (Ptr CreateBannerResult)
sendCreateBannerResult result = do
  ptr <- mallocBytes 8 :: IO (Ptr CreateBannerResult)
  (resultPtr, resultLen) <- sendText result
  poke (plusPtr ptr 0) resultPtr
  poke (plusPtr ptr 4) resultLen
  return ptr

foreign export ccall compile :: Ptr CChar -> Int -> IO (Ptr CompileResult)

compile :: Ptr CChar -> Int -> IO (Ptr CompileResult)
compile inputPtr inputLen = do
  input <- receiveText inputPtr inputLen
  let result = Nazuki.compile input
  sendCompileResult result

foreign export ccall assemble :: Ptr CChar -> Int -> IO (Ptr CompileResult)

assemble :: Ptr CChar -> Int -> IO (Ptr CompileResult)
assemble inputPtr inputLen = do
  input <- receiveText inputPtr inputLen
  let result = Nazuki.assemble input
  sendCompileResult result

foreign export ccall run :: Ptr CChar -> Int -> Ptr CChar -> Int -> IO (Ptr CompileResult)

run :: Ptr CChar -> Int -> Ptr CChar -> Int -> IO (Ptr CompileResult)
run programPtr programLen inputPtr inputLen = do
  program <- receiveText programPtr programLen
  input <- receiveText inputPtr inputLen
  let result = Nazuki.run program input
  sendCompileResult result

foreign export ccall createBanner :: Ptr CChar -> Int -> IO (Ptr CreateBannerResult)

createBanner :: Ptr CChar -> Int -> IO (Ptr CreateBannerResult)
createBanner sourcePtr sourceLen = do
  source <- receiveText sourcePtr sourceLen
  let result = Nazuki.createBanner source
  sendCreateBannerResult result
