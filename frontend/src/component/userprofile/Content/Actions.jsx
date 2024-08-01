import { Box, Button, ButtonGroup } from "@chakra-ui/react";

function Actions({ work }) {
  return (
    <Box
      className="profile"
      mt={3}
      py={5}
      px={8}
      borderTopWidth={1}
      border={"none"}
    >
      <Button
        style={{ border: "solid ", borderColor: "#0e8797" }}
        backgroundColor={"#0E8797"}
      >
        {work}
      </Button>
    </Box>
  );
}

export default Actions;
