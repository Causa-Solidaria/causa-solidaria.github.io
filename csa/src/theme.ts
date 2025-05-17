//import { extend} from "@chakra-ui/react"
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"



const config = defineConfig({
  cssVarsRoot: ":where(:root, :host)",
  cssVarsPrefix: "ck",
  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
      backgroundColor: "pri",
    },
  },
  theme: {
    tokens: {
      colors: {
        pri:    { value: "#C0F5B4" },
        sec:    { value: "#168F4C" },
        ter:    { value: "#012404" },
        qua:    { value: "#02E351" },
        qui:    { value: "#ffffff" }
      },
      fonts: {
        body: { value: "system-ui, sans-serif" },
        
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)