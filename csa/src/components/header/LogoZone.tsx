import { Box, LinkBox, Link, Heading } from "@chakra-ui/react"
import Logo from "../logo"
import { ScreenSize } from "csa/utils/getScreenSize"
import { isMobile } from "./headerUtils"
import ButtonZone from "./ButtonZone"

const LogoZone = () => {
  const { width, height } = ScreenSize()
  const mobile = isMobile(width, height)
  return (
    <Box style={{ display: "flex", flexDirection: "column" }} transition="all 0.3s">
      <LinkBox
        p={2}
        bg="ter"
        minH="6em"
        maxH={`${height * 0.1 - 2}dhv`}
        minW="max-content"
        w={mobile ? width : width * 0.1}
        alignContent="center"
        borderRadius="0 0 20px 0"
        transition="all 0.3s"
      >
        <Link href="/">
          <Logo width="5em" />
          <Heading fontSize="24pt" minW="50%" color="qui">causa solidaria</Heading>
        </Link>
      </LinkBox>
      {mobile && <ButtonZone />}
    </Box>
  )
}

export default LogoZone
