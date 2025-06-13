//import { extend} from "@chakra-ui/react"
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"



const config = defineConfig({
  cssVarsRoot: ":where(:root, :host)",
  cssVarsPrefix: "ck",
  globalCss: {
    
    "html, body": {
      margin: 0,
      p: 0,
      bg: "pri",
    },
  
    "h1, h2, h3, h4, h5, h6, p, a, ul, li": {
      color: "{colors.brand.preto}",
      fontFamily: "Quicksand",
      fontWeight: 600,
    }
  
  },
  theme: {
    tokens: {
      colors: {
        brand:{
          verde_claro:    { value: "#C0F5B4" },
          verde_escuro:   { value: "#168F4C" },
          preto:          { value: "#012404" },
          ciano_claro:    { value: "#02E351" },
          branco:         { value: "#ffffff" }
        },
        pri:{
          DEFAULT : { value: "{colors.brand.verde_claro}" }
        },
        sec:{
          DEFAULT : { value: "{colors.brand.verde_escuro}" }
        },
        ter:{
          DEFAULT : { value: "{colors.brand.preto}" }
        },
        qua:{
          DEFAULT : { value: "{colors.brand.ciano_claro}" }
        },
        qui:{
          DEFAULT : { value: "{colors.brand.branco}" }
        }
      },
      fonts: {
        body: { value: "Quicksand, system-ui, sans-serif" },
      },
    },
    breakpoints: {
      sm: '320px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
  },
})

export const system = createSystem(defaultConfig, config)