import { useRef, useState } from "react";
import { Box, Image } from "@chakra-ui/react";

export default function Cover() {
  return (
    <Box h={60} overflow="hidden">
      <Image
        w="full"
        h="full"
        objectFit="cover"
        src={"cover.png"}
        alt="Cover"
      />
    </Box>
  );
}
