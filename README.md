<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/NathaliaBarreiros/ProofLocation">
    <img src="images/logo.png" alt="Logo" width="auto" height="120">
  </a>

<h3 align="center">Don't Ping Us!📍 - POC for Privacy-Preserving Geolocation Verification</h3>

  <p align="center">
    A circuit and front end demo for end users to proof their location (inside a predefined region) without revealing their position (lat, lng)
    <br />
    <a href="https://github.com/NathaliaBarreiros/ProofLocation/issues/new?labels=bug&template=bug-report.md">Report Bug</a>
    ·
    <a href="https://github.com/NathaliaBarreiros/ProofLocation/issues/new?labels=enhancement&template=feature-request.md">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Proof of Location Screen Shot][product-screenshot]](https://example.com)

### The Problem

Most companies ask for our geolocation to give us access to location-restricted content, optimized search results, or products based in our region and more. This could be fine if only the data centers weren't always at risk of getting hacked, or even worse, if companies didn’t make us sign data treatment policies that allow them to sell our data to third parties, basically compromising it even more.

## Our Solution

[![ZK Location App][homepage]](homepage.com)

Don't Ping Us!📍 is a zero-knowledge proof system that allows users to prove their presence within a specified geographic area without revealing their exact location.

[![Select area on map][select-area]](https://select-area-on-map.com)
[![Point outside polygon][invalid-loc-proof]](https://point-outside-polygon.com)
[![Point inside polygon][valid-loc-proof]](https://point-inside-polygon.com)

### Key features:

1. Primitive for validating user geolocation without disclosing precise coordinates
2. Protects user privacy while enabling location-based services
3. Prevents unauthorized access to and misuse of exact location data

### How it works:

[![ZK Location Diagram][zk-location-diagram]](https://zk-location-diagram.com)

1. Admin defines a geographic region
2. User generates a proof of their location (client-side only)
3. Proof is verified by a smart contract
4. Access to content/features is granted based on verification result

### Benefits:

- Enhanced user location privacy and security
- Enables location-restricted content and region-based services
- Eliminates risks associated with storing and sharing precise location data

This solution addresses the growing concern of location data misuse while still allowing businesses to provide location-based services effectively.

## The Circom Circuit

You can find more about the circuit here: [LINK CIRCOM CIRCUIT README](https://github.com/NathaliaBarreiros/ProofLocation/tree/main/circuits)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Vite][Vite.js]][Vite-url]
- [![React][React.js]][React-url]
- [![Solidity][Solidity.js]][Solidity-url]
- [![Typescript][Typescript.js]][Typescript-url]
- [![Hardhat][Hardhat.js]][Hardhat-url]
- [![SnarkJS][SnarkJS.js]][SnarkJS-url]
- [![Circom][Circom.js]][SnarkJS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Setup and Execution

Folow these steps to run:

- [Circom circuits](https://github.com/NathaliaBarreiros/ProofLocation/tree/main/circuits)
- [Hardhat smart contracts](https://github.com/NathaliaBarreiros/ProofLocation/tree/main/contracts)
- [Vite frontend application](https://github.com/NathaliaBarreiros/ProofLocation/tree/main/frontend)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Some applications for this primitive

- Geo-restricted content on apps (Netflix)
- Geo-restricted app usage (Defi, Neobanks)
- Alert objects leaving a zone (car rental, parole)
- Alert objects entering a restricted zone (drones)
- Geolocated tailored search results (ads, SEO)
- Events and souvenir minting on valid proofs.

### Geo-restricted voting system integrated with MACI

[![ZK Location Diagram][zk-location-maci-diagram]](https://zk-location-maci-diagram.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Future work / Considerations

### Challenges Faced

- RayCasting Algorithm Implementation in Circom
  - Insufficient precision for geolocation
  - Complexity in low-level language

### Opportunities/Improvements

- Explore High-Level ZK Languages
  - Simplify implementation of complex algorithms
- MACI Integration
  - Complete integration for geo-restricted voting system
- Research Alternative Location Approaches
  - Investigate geolocation algorithms compatible with ZK
  - Focus on efficient implementation within ZK constraints
  - Explore alternative point-in-polygon algorithms
  - Ensure efficient proof generation on client side

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

👩🏻‍💻 Nathalia Barreiros - [@NathBarreiros](https://twitter.com/NathBarreiros) - nathalia.barreirosf@gmail.com

🧑🏻‍💻 Daniel Arroyo - [@daniel0ar](https://twitter.com/daniel0ar) - email@email_client.com

Project Link: [https://github.com/NathaliaBarreiros/ProofLocation](https://github.com/NathaliaBarreiros/ProofLocation)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [PSE Core Program](https://github.com/privacy-scaling-explorations/core-program) for their mentorship & support
- [Vivian Plasencia](https://vivianblog.hashnode.dev/how-to-create-a-zero-knowledge-dapp-from-zero-to-production) for her insightful tutorials on zero-knowledge dApp development
- [MACI](https://github.com/privacy-scaling-explorations/maci) project for inspiration on privacy-preserving voting systems and zk development
- All contributors and testers who helped shape this project

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[product-screenshot]: images/screenshot.png
[zk-location-diagram]: images/zk-location-diagram.jpg
[zk-location-MACI-Diagram]: images/zk-location-maci-diagram.jpg
[homepage]: images/homepage.png
[invalid-loc-proof]: images/invalid-loc-proof.png
[select-area]: images/select-area.png
[valid-loc-proof]: images/valid-loc-proof.png
[Vite.js]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Solidity.js]: https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white
[Solidity-url]: https://soliditylang.org/
[Circom.js]: https://img.shields.io/badge/Circom-000000?style=for-the-badge&logo=circom&logoColor=white
[Circom-url]: https://docs.circom.io/
[Typescript.js]: https://img.shields.io/badge/Typescript-000000?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[Hardhat.js]: https://img.shields.io/badge/Hardhat-000000?style=for-the-badge&logo=hardhat&logoColor=white
[Hardhat-url]: https://hardhat.org/
[SnarkJs.js]: https://img.shields.io/badge/SnarkJs-000000?style=for-the-badge&logo=circom&logoColor=white
[SnarkJs-url]: https://github.com/iden3/snarkjs
