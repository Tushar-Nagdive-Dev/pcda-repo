/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      },
      backgroundColor: {
        mainprimarycolor: "rgba(21, 34, 101, 1)",
        mainprimarysecondcolor: "rgba(28, 43, 120, 1)",
        mainsecondarycolor: "rgba(255, 255, 255, 1)",
        mainsecondarysecond: "rgba(235, 240, 247, 1)",
        selectedSecondary: "rgba(211, 224, 241, 1)",
        paragraphcolor: "rgba(102, 102, 102, 1)",
        statebluecolor: "rgba(13, 110, 253, 1)",
        gradientbtnfirstcolor: "rgba(13, 110, 253, 1)",
        gradientbtnsecondcolor: "rgba(21, 34, 101, 1)",
        keynotegradientfirstcolor: "rgba(255, 111, 0, 1)",
        keynotegradientsecondcolor: "rgba(0, 153, 79, 1)",
        footermenulistcolor: "rgba(204, 211, 216, 1)",
        inputplaceholdercolor: "rgba(210, 210, 227, 1)",
        newprimaryColor: "rgba(0, 0, 153, 1)",
        secondaryGrey: "rgba(102, 102, 102, 1)",
        titleColor: "rgba(64, 64, 64, 1)",
        borderSecondaryColor: "rgba(158, 197, 255, 1)",
        ternaryGrey: "rgba(30, 30, 30, 1)",
        orangeIndiaForegroundColor: "rgba(253, 246, 235, 1)",
        orangeIndiaPrimaryColor: "rgba(223, 157, 52, 1)",
        blueIndiaForegroundColor: "rgba(220, 234, 255, 1)",
        greenIndiaForegroundColor: "rgba(196, 240, 225, 1)",
        greenIndiaPrimaryColor: "rgba(0, 170, 112, 1)",
        loginButtonPrimary: "rgba(255, 59, 48, 1)",
        loginButtonHover: "rgba(0, 0, 153, 1)",
        adminCard: "rgba(237, 240, 243, 1)",
        darkOrange: "rgba(223, 157, 52, 1)",
        darkGreenTitle: "rgba(0, 170, 112, 1)",
        greyGradientColor: "rgba(217, 217, 217, 1)",
      },
      colors: {
        mainprimarycolor: "rgba(21, 34, 101, 1)",
        mainprimarysecondcolor: "rgba(28, 43, 120, 1)",
        mainsecondarycolor: "rgba(255, 255, 255, 1)",
        mainsecondarysecond: "rgba(235, 240, 247, 1)",
        selectedSecondary: "rgba(211, 224, 241, 1)",
        paragraphcolor: "rgba(102, 102, 102, 1)",
        statebluecolor: "rgba(13, 110, 253, 1)",
        gradientbtnfirstcolor: "rgba(13, 110, 253, 1)",
        gradientbtnsecondcolor: "rgba(21, 34, 101, 1)",
        keynotegradientfirstcolor: "rgba(255, 111, 0, 1)",
        keynotegradientsecondcolor: "rgba(0, 153, 79, 1)",
        footermenulistcolor: "rgba(204, 211, 216, 1)",
        inputplaceholdercolor: "rgba(210, 210, 227, 1)",
        newprimaryColor: "rgba(0, 0, 153, 1)",
        secondaryGrey: "rgba(102, 102, 102, 1)",
        ternaryGrey: "rgba(30, 30, 30, 1)",
        titleColor: "rgba(64, 64, 64, 1)",
        linktext: "rgba(0, 139, 249, 1)",
        orangeIndiaForegroundColor: "rgba(253, 246, 235, 1)",
        orangeIndiaPrimaryColor: "rgba(223, 157, 52, 1)",
        blueIndiaForegroundColor: "rgba(220, 234, 255, 1)",
        greenIndiaForegroundColor: "rgba(196, 240, 225, 1)",
        greenIndiaPrimaryColor: "rgba(0, 170, 112, 1)",
        borderSecondaryColor: "rgba(158, 197, 255, 1)",
        adminTextColor: "rgba(41, 45, 50, 1)",
        darkOrange: "rgba(223, 157, 52, 1)",
        darkGreenTitle: "rgba(0, 170, 112, 1)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        terinary: {
          DEFAULT: "hsl(var(--terinary))",
          foreground: "hsl(var(--terinary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      gridTemplateColumns: {
        "60-40": "60% 40%", // Adds custom grid template
      },
      screens: {
        mid_hd_screen: "1600px",
        full_hd_screen: "1919px",
        hd_screen: "1440px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), 
    require('tailwind-scrollbar'),
  ],
};
