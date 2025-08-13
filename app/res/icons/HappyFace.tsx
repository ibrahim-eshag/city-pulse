import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

const HappyFace = (props: SvgProps) => (
  <Svg width={90} height={90} viewBox="0 0 90 90" fill="none" {...props}>
    <Circle cx={45} cy={45} r={44.5} fill="white" stroke="#DEE1EA" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23 43C24.1046 43 25 43.8954 25 45C25 56.0457 33.9543 65 45 65C56.0457 65 65 56.0457 65 45C65 43.8954 65.8954 43 67 43C68.1046 43 69 43.8954 69 45C69 58.2548 58.2548 69 45 69C31.7452 69 21 58.2548 21 45C21 43.8954 21.8954 43 23 43Z"
      fill="#DEE1EA"
    />
    <Path
      d="M39 30C39 32.7614 36.7614 35 34 35C31.2386 35 29 32.7614 29 30C29 27.2386 31.2386 25 34 25C36.7614 25 39 27.2386 39 30Z"
      fill="#DEE1EA"
    />
    <Path
      d="M61 30C61 32.7614 58.7614 35 56 35C53.2386 35 51 32.7614 51 30C51 27.2386 53.2386 25 56 25C58.7614 25 61 27.2386 61 30Z"
      fill="#DEE1EA"
    />
  </Svg>
);
export default HappyFace;
