// ethsofia-front/data/mockListings.ts

interface ListingCardData {
    title: string;
    subtitle: string;
    description: string;
    link: string;
  }
  
  const mockListings: ListingCardData[] = [
    {
      title: "Ethereum-based Token Launch",
      subtitle: "Token Launchpad",
      description: "Join the next wave of decentralized finance (DeFi) with our Ethereum-based token launch platform. We provide all the necessary tools and resources for token creation, marketing, and liquidity management to ensure your project reaches its full potential.",
      link: "https://example.com/token-launch",
    },
    {
      title: "NextUI",
      subtitle: "nextui.org",
      description: "Make beautiful websites regardless of your design experience. NextUI provides a set of components and utilities that make UI development in React a breeze.",
      link: "https://github.com/nextui-org/nextui",
    },
    {
      title: "React",
      subtitle: "reactjs.org",
      description: "A JavaScript library for building user interfaces. React is known for its flexibility and performance, making it a favorite among developers.",
      link: "https://github.com/facebook/react",
    },
    {
      title: "Vue",
      subtitle: "vuejs.org",
      description: "The Progressive JavaScript Framework. Vue is designed to be incrementally adoptable, meaning you can scale it from simple to complex applications.",
      link: "https://github.com/vuejs/vue",
    },
    {
      title: "Angular",
      subtitle: "angular.io",
      description: "One framework. Mobile & desktop. Angular is a powerful framework for building web applications, providing robust features for developers.",
      link: "https://github.com/angular/angular",
    },
    {
      title: "Svelte",
      subtitle: "svelte.dev",
      description: "Cybernetically enhanced web apps. Svelte shifts much of the work to the compile step, resulting in fast and lightweight applications.",
      link: "https://github.com/sveltejs/svelte",
    },
    {
      title: "Next.js",
      subtitle: "nextjs.org",
      description: "The React Framework for Production. Next.js offers a rich feature set, including server-side rendering, static site generation, and API routes.",
      link: "https://github.com/vercel/next.js",
    },
    {
      title: "Gatsby",
      subtitle: "gatsbyjs.com",
      description: "Build blazing-fast sites with React. Gatsby utilizes React and GraphQL, allowing you to pull in data from various sources for your site.",
      link: "https://github.com/gatsbyjs/gatsby",
    },
    {
      title: "Material-UI",
      subtitle: "mui.com",
      description: "React components that implement Google's Material Design. Material-UI provides a robust library of customizable components to speed up your development.",
      link: "https://github.com/mui/material-ui",
    },
  ];
  
  export default mockListings;
  