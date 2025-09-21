import { Box, LinkBox, Link, Heading } from "@chakra-ui/react"
import Logo from "../logo"
import { isMobile } from "csa/utils/isMobile"

const LogoZone = () => {
  const mobile = isMobile()

  return (
    <Box transition="all 0.3s">
      <LinkBox
        p={2}
        minH="4em"
        minW="max-content"
        w={mobile ? "full" : "min-content"}
        alignContent="center"
        borderRadius={mobile ? "0 0 20px 20px" : "0 0 20px 0"}
        transition="all 0.3s"
      >
        <Link href="/" display={"flex"} flexDirection={mobile ? "column" : "row"} justifySelf={mobile ? "center" : "flex-start"} alignItems="center" textJustify={"center"}>
          <Logo width="4em" />
          <Heading fontSize="24pt" minW="50%" color="qui">causa solidaria</Heading>
        </Link>
      </LinkBox>
    </Box>
  )
}

export default LogoZone
