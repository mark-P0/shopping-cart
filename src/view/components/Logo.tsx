import { ComponentProps } from "react";

/**
 * - https://twitter.com/testdrive
 * - https://www.adobe.com/express/feature/image/convert/png-to-svg
 */
export function Logo(props: ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="100%"
      viewBox="0 0 225 225"
      // enable-background="new 0 0 225 225"
      xmlSpace="preserve"
      fill="currentColor"
    >
      {/* Top crown */}
      <path
        fill="currentColor"
        opacity="1.000000"
        stroke="none"
        d="M108.688141,50.541386 C110.968666,46.071468 113.078201,41.930534 115.545105,37.088085 C117.246841,40.227188 118.738602,42.859642 120.121292,45.548195 C132.584915,69.783020 145.061676,94.011314 157.396591,118.311569 C158.110229,119.717476 158.408722,122.552231 157.582397,123.340637 C143.125381,137.134323 128.462463,150.712234 113.661537,164.507385 C101.076790,151.570312 86.710243,136.801544 72.086304,121.768196 M118.664009,58.892902 C117.721619,57.178448 116.779228,55.463993 115.600555,53.319691 C104.275795,75.294762 93.174973,96.769775 82.217163,118.317505 C81.736259,119.263168 82.089012,121.376488 82.853775,122.100273 C94.191780,132.831070 105.665230,143.418762 116.176453,153.176819 C126.700775,143.405945 138.741806,132.226944 150.656662,121.165100 z"
      />
      {/* Left crown */}
      <path
        fill="currentColor"
        opacity="1.000000"
        stroke="none"
        d="M91.366608,165.636414 C83.988739,158.652649 76.858780,151.922104 69.382339,144.864502 C62.469524,150.271591 54.772339,156.292221 46.407990,162.834671 C40.680592,139.170135 35.094162,116.088066 29.797680,94.204002 C41.273079,104.881058 53.363743,116.130577 65.855560,127.753334 C63.313160,129.879227 61.603420,131.308868 59.262363,133.266403 C54.225163,127.990204 49.265369,122.795082 44.305580,117.599960 C43.963684,117.781693 43.621792,117.963417 43.279900,118.145149 C45.762890,128.491562 48.245884,138.837982 50.890759,149.858948 C57.823196,144.439743 64.197914,139.456528 69.732216,135.130280 C83.330673,147.983765 96.712852,160.632828 110.370872,173.542618 C106.434937,177.949081 103.109612,181.820633 99.586563,185.503021 C98.787872,186.337814 97.305603,186.926331 96.133400,186.934067 C81.656303,187.029663 67.178352,186.996429 52.236298,186.996429 C51.107006,182.097672 49.364704,177.326141 49.183022,172.495911 C49.100616,170.305054 52.113228,167.997803 54.502979,164.648590 C55.990753,170.564713 57.096424,174.961411 58.274403,179.645630 C69.956802,179.645630 81.421234,179.881378 92.860519,179.449921 C95.193367,179.361938 97.431633,176.766312 100.457565,174.857193 z"
      />
      {/* Right crown */}
      <path
        fill="currentColor"
        opacity="1.000000"
        stroke="none"
        d="M186.589844,118.576004 C167.968460,136.636002 149.347092,154.696014 131.105759,172.387451 C134.056396,178.492355 137.366730,180.005066 142.277206,179.769943 C150.582870,179.372253 158.926849,179.483475 167.243622,179.740479 C171.025436,179.857330 173.401550,179.024292 173.321014,174.516159 C175.939560,174.516159 178.337051,174.516159 181.170013,174.516159 C180.068817,178.714401 179.024994,182.693909 177.897339,186.992981 C163.474670,186.992981 149.187531,187.020126 134.901047,186.935654 C133.881378,186.929642 132.602493,186.358368 131.894012,185.618896 C128.354736,181.924942 124.965744,178.087006 121.304153,174.057907 C148.084732,146.859695 174.599884,119.931053 201.115021,93.002403 C201.426041,93.104065 201.737045,93.205719 202.048050,93.307381 C200.138290,100.968307 198.270248,108.639938 196.309906,116.287903 C192.435074,131.404861 188.252197,146.449295 184.736557,161.648590 C183.414001,167.366455 179.839920,165.566513 175.819885,165.813171 C179.809418,150.329758 183.681564,135.301910 187.746857,119.600639 C187.821365,118.528816 187.702728,118.130432 187.584076,117.732040 z"
      />
    </svg>
  );
}
