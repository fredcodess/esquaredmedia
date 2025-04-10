import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  VStack,
  HStack,
  Image,
  Box,
  Text,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { DownloadIcon, RepeatIcon } from "@chakra-ui/icons";
import { FaCloudUploadAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import useImageStore from "../store/imageStore";

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionImage = motion(Image);

const Toolkit = ({ bg }) => {
  const { image, isLoading, uploadImage, reset } = useImageStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleUpload = () => {
    if (selectedFile) uploadImage(selectedFile);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "background-removed.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <VStack minH="100vh" justify="center" spacing={6} bg={bg} p={6}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Text fontSize="2xl" fontWeight="bold">
          Remove Image Background
        </Text>
      </motion.div>

      {!preview ? (
        <MotionBox
          {...getRootProps()}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, borderColor: "blue.300" }}
          transition={{ duration: 0.3 }}
          border="2px dashed"
          borderColor="gray.500"
          borderRadius="md"
          p={6}
          textAlign="center"
          cursor="pointer"
          maxW="400px"
        >
          <input {...getInputProps()} />
          <Icon as={FaCloudUploadAlt} boxSize={12} color="gray.400" />
          <Text mt={2} color="gray.300">
            Drag & drop an image here, or click to select
          </Text>
        </MotionBox>
      ) : (
        <VStack spacing={4}>
          {!image && (
            <VStack>
              <MotionImage
                src={preview}
                alt="Preview"
                maxW="300px"
                borderRadius="md"
                boxShadow="lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <MotionButton
                colorScheme="blue"
                onClick={handleUpload}
                isLoading={isLoading}
                loadingText="Processing..."
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Upload Image
              </MotionButton>
            </VStack>
          )}

          {/* Processed Image Section */}
          {image && (
            <HStack spacing={8} align="center">
              {/* Original Image Section */}
              <VStack>
                <Text fontSize="md" color="gray.400">
                  Original Image
                </Text>
                <MotionImage
                  src={preview}
                  alt="Original"
                  maxW="300px"
                  borderRadius="md"
                  boxShadow="lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <MotionButton
                  leftIcon={<RepeatIcon />}
                  colorScheme="red"
                  onClick={reset}
                  mt={3}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Choose Another Image
                </MotionButton>
              </VStack>

              <Divider
                orientation="vertical"
                height="250px"
                borderColor="gray.600"
              />

              {/* Processed Image Section */}
              <VStack>
                <Text fontSize="md" color="gray.400">
                  Processed Image
                </Text>
                <MotionImage
                  src={image}
                  alt="Processed"
                  maxW="300px"
                  borderRadius="md"
                  boxShadow="lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <MotionButton
                  leftIcon={<DownloadIcon />}
                  colorScheme="green"
                  onClick={handleDownload}
                  mt={3}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Download Image
                </MotionButton>
              </VStack>
            </HStack>
          )}
        </VStack>
      )}
    </VStack>
  );
};

export default Toolkit;
