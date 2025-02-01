// tailwind.config.ts
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        backgroundImage: {
          "metric-card": "linear-gradient(180deg, #6A0E58 0%, #2A0476 100%)",
        },
      },
    },
    plugins: [],
  };
  