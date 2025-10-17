import { Box, Flex, Heading } from "@chakra-ui/react"
import { staticPosition } from "csa/utils/staticPosition"
import Logo from "csa/components/logo"
import { getToken } from "csa/utils/isloged";



// O componente Main do Header

const Header = () => {
  const isLogged = getToken();

  return (
    <Flex 
      direction={"row"} 
      alignItems="center"
      justifyContent={"space-between"}
      borderRadius={0} 
      position={"sticky"}

      bg="#00B944"  
      maxW={"100vmax"}
      minW={"100vmax"}
      minH={staticPosition(244, 3197)} 
      h={staticPosition(244, 3197)} 
      left={0} 
      top={0} 
      zIndex={100} 
      px={staticPosition(67, 3197)}
    >
      <Box
        onClick={()=>{ window.location.href="/" }}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyItems={"center"}
        textAlign={"center"}
        p={staticPosition(10, 3197)}
        minH={staticPosition(173, 3197)}
        maxH={staticPosition(173, 3197)}
        minW={staticPosition(617, 3197)}
        maxW={staticPosition(617, 3197)}
      >
        <Logo width={staticPosition(173, 3197)} />
        <Heading
          fontSize={staticPosition(48, 3197)}
          minW={staticPosition(386, 3197)}
          maxW={staticPosition(386, 3197)}
          minH={staticPosition(67, 3197)}
          maxH={staticPosition(67, 3197)}
          textShadow={
            `${staticPosition(-5, 3197)} ${staticPosition(5, 3197)} 0  #000, 
            ${staticPosition(5, 3197)} ${staticPosition(-5, 3197)} 0  #000, 
            ${staticPosition(-5, 3197)} ${staticPosition(-5, 3197)}  0 #000,
            ${staticPosition(5, 3197)} ${staticPosition(5, 3197)}  0 #000,
            ${staticPosition(-5, 3197)} ${staticPosition(5, 3197)}  0 #000`
          }
          color="qui"
        >
          causa solidaria
        </Heading>
      </Box>
      
      <Flex
        direction={"row"}
        alignItems={"center"}
        gap={staticPosition(40, 3197)}
      >
        {!isLogged && <Flex
          direction={"row"}
          gap={staticPosition(40, 3197)}
        >
          {[
            {label: "entrar", link: "/login"},
            {label: "cadastrar", link: "/cadastro"}
          ].map(({label, link}, index) => (
            <Box
              key={index}
              onClick={()=>{window.location.href = link}}
              maxH={staticPosition(70, 3197)}
              minH={staticPosition(70, 3197)}
              bg = {"#006E1F"}
              px={staticPosition(30, 3197)}
              borderRadius={staticPosition(12, 3197)}
              color={"#fff"}
              fontWeight={"900"}
            >
              {label}
            </Box>
          ))}
        </Flex>}

        <Box 
          maxW={staticPosition(137, 3197)}
          minW={staticPosition(137, 3197)}
          maxH={staticPosition(137, 3197)}
          minH={staticPosition(137, 3197)}

          border={`${staticPosition(3, 3197)} solid #000`}
        >

        </Box>
      </Flex>
    </Flex>
  )
}

export default Header
