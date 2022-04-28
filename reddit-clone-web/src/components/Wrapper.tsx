import { Box } from "@chakra-ui/react";
interface WrapperProps {
  variant?: "small" | "regular";
}

const Wrapper: React.FC<WrapperProps> = ({ variant = "regular", children }) => {
  return (
    <Box
      mt={4}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
