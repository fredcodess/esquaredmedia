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
import useImageStore from "../store/imageStore";

const Toolkit = ({ bg }) => {
  const { image, isLoading, uploadImage, reset } = useImageStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle file drop
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
      <Text fontSize="2xl" fontWeight="bold">
        Remove Image Background
      </Text>

      {!preview ? (
        <Box
          {...getRootProps()}
          border="2px dashed"
          borderColor="gray.500"
          borderRadius="md"
          p={6}
          textAlign="center"
          cursor="pointer"
          _hover={{ borderColor: "blue.300" }}
          maxW="400px"
        >
          <input {...getInputProps()} />
          <Icon as={FaCloudUploadAlt} boxSize={12} color="gray.400" />
          <Text mt={2} color="gray.300">
            Drag & drop an image here, or click to select
          </Text>
        </Box>
      ) : (
        <VStack spacing={4}>
          {!image && (
            <VStack>
              <Image
                src={preview}
                alt="Preview"
                maxW="300px"
                borderRadius="md"
                boxShadow="lg"
              />
              <Button
                colorScheme="blue"
                onClick={handleUpload}
                isLoading={isLoading}
                loadingText="Processing..."
              >
                Upload Image
              </Button>
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
                <Image
                  src={preview}
                  alt="Original"
                  maxW="300px"
                  borderRadius="md"
                  boxShadow="lg"
                />
                <Button
                  leftIcon={<RepeatIcon />}
                  colorScheme="red"
                  onClick={reset}
                  mt={3}
                >
                  Choose Another Image
                </Button>
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
                <Image
                  src={image}
                  alt="Processed"
                  maxW="300px"
                  borderRadius="md"
                  boxShadow="lg"
                />
                <Button
                  leftIcon={<DownloadIcon />}
                  colorScheme="green"
                  onClick={handleDownload}
                  mt={3}
                >
                  Download Image
                </Button>
              </VStack>
            </HStack>
          )}
        </VStack>
      )}
    </VStack>
  );
};

export default Toolkit;
