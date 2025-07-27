import { Box, LinkBox, Link, Heading } from "@chakra-ui/react"
import Logo from "../logo"
import { ScreenSize } from "csa/utils/getScreenSize"
import { isMobile } from "csa/utils/isMobile"
import ButtonZone from "./ButtonZone"

const LogoZone = () => {
  const { width, height } = ScreenSize()
  const mobile = isMobile(width, height, 700)

  return (
    <Box transition="all 0.3s">
      <LinkBox
        p={2}
        bg="ter"
        minH="4em"
        maxH={`${height * 0.1}dhv`}
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
