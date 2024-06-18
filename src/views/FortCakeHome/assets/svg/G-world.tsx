import React, { SVGAttributes } from 'react'

const SvgComponent: React.FC<SVGAttributes<HTMLOrSVGElement>> = (props) => (
    <svg viewBox="0 0 512 512" {...props}>
        <path
            d="M250.6 503.3c-29.6-2-60.6-9.8-86.7-22l-9.1-4.2-6.3 3.1c-8.2 4.1-14.8 4.8-22.3 2.6-10.2-3-17.6-9.2-21.9-18.5-1.7-3.6-2.1-6.5-2.1-14.2v-9.7l-11.5-11.8c-32.9-33.7-55.3-76.2-65-123-2.6-12.5-5-32.7-5-42.1v-7.2l-4.2-2.2c-9.4-4.8-13.2-9.1-15.3-17.5-1.6-6.2-1.9-16.7-.5-21 .5-1.6 1.2-4.1 1.5-5.7 1.4-6.5 12.5-14.9 21.5-16.3 2.3-.4 4.4-1.2 4.8-1.8.4-.6 2.6-6.7 4.8-13.6 6.7-20.2 19.9-48 26.1-54.6 3.1-3.3 8.2-3.3 12.3.1 4.2 3.6 4.1 7.9-.3 15.3-8.5 14-17.4 34.2-22.3 50.3l-2.3 7.5 5.1 5.7c5.8 6.5 4 6.2 23.1 2.9 16.6-2.9 37.1-5.1 56.1-5.9l17.1-.8 6.4-6.5c7.9-8 14.3-10.8 25.2-10.9l7.2-.1 9-11.6c4.9-6.4 16.3-18.9 25.1-27.8l16.1-16.2-1.4-5.4c-.9-3.3-1.2-7.3-.9-10.2.7-5.5 1.1-5.1-16.5-14.2-13.6-7-27.4-12.8-43-18.2l-12.8-4.4-5.7 5.8c-4.2 4.2-7.3 6.4-11.5 8-6.9 2.6-16.3 2.8-22.2.5-2.2-.8-4.8-1.8-5.8-2.1-1.3-.4-4.9 2.4-13.6 11.1-7.9 7.8-12.5 11.6-14 11.6-5.3 0-10-4.7-10.1-9.8 0-2.9 1.4-4.8 12-15.7l12.1-12.3-1.2-6.1c-2.3-11.8.9-22 9.6-29.9 11.5-10.6 26.5-11.9 39.4-3.5l5.3 3.5 10.2-4.5c50.5-22.3 106.5-27 160.5-13.5 14.2 3.6 22.7 6.4 36.9 12.5 10.1 4.3 11.2 4.6 12.8 3.2 7.8-6.9 22-8.5 32.2-3.7 6.6 3.1 13.1 9.4 16.2 15.7 1.9 3.9 2.3 6.3 2.3 14.7v10l6.7 6.4 6.7 6.4 4.5-1.1c11.4-2.9 22.4-.1 30.4 7.7 7.3 7.1 9.7 12.9 9.7 23.2 0 7.3-.4 9.3-2.9 14.3l-2.9 5.8 7 14.2c12.8 26 20.4 51.1 22.5 74.2 1.4 15.4 1.6 54.1.3 71-1.1 14.6-6.5 37.3-13 53.8-13.1 33.6-30.3 60.2-54.8 85.3L431.5 441l1.2 4.7c6.9 27.4-24.4 49.7-48.4 34.4l-4.8-3-11.7 5.2c-36.2 16.1-77.8 23.6-117.2 21zm52.5-21c22-3.8 40.2-9.3 58.2-17.6l8.2-3.8v-6.2c0-15 8.5-27.5 21.7-32l3.8-1.3.6-6.8c.3-3.8.7-12.8.8-20.1.1-15.3 1.1-18.4 6.5-20.2 2.7-.9 4.1-.8 6.8.3 5.5 2.3 6.2 5.2 5.4 24.5-.4 9.2-.9 18.3-1.3 20.3-.6 3.4-.3 3.8 2.6 5.3l3.2 1.7 6.5-6.3c15.6-15.3 32.6-38.4 42.8-58.1l5-9.7-4.5-4.6c-11.5-11.8-41.4-36.9-55.9-46.9-6.2-4.3-7.3-4.7-8.6-3.5s-1.3 2.1 0 6.9c2.4 9 6.5 30.7 6.5 34.5 0 5-3.6 8.4-8.8 8.4-7.2 0-7.9-1.4-12.2-22.5-2.1-10.4-4.2-19.2-4.7-19.7s-3.5-1.4-6.7-2l-5.9-1.2-2.6 3c-1.4 1.7-6.2 7.2-10.6 12.4-11.6 13.7-37.1 38.9-51.5 50.8-40.5 33.8-84.6 60.2-130.5 78.1-6.1 2.4-11.3 4.6-11.6 4.9-.3.3-.9 2.7-1.2 5.2l-.6 4.6 8.9 4.2c17.9 8.3 43.6 15.6 63.5 18 4.9.6 10.4 1.3 12 1.5 8.5 1.4 42.8-.1 54.2-2.1zm107.7-19.9c3.4-3.4 3.9-4.5 3.9-8.5 0-8.8-5.1-13.9-13.6-13.8-7.5.1-12.4 5.3-12.4 13.3s5.1 12.9 13.4 12.9c4.2 0 5.2-.5 8.7-3.9zm-268.1-.7c7-6.7 5.4-17.5-3.3-22-8.3-4.3-18.8 2.3-18.8 11.9 0 8.4 6 14.1 14.3 13.4 3.6-.3 5.6-1.2 7.8-3.3zm29.7-33c16.5-6.5 51.4-23.8 66.5-33.1 43.2-26.5 80.7-58.8 113-97.1l7-8.3-2.3-5.2c-1.4-3.3-2.4-8-2.7-12.9l-.5-7.7-10.1-4.7c-35.5-16.6-77-29.5-114.7-35.9-8.3-1.4-16-2.6-17-2.6-1.3 0-2.7 1.7-4.4 5.4-1.4 3-4.6 7.3-7.1 9.6-6.7 6.1-12.3 8.4-21.9 8.7l-8 .2-2.2 4.3c-3 6-11.6 27.6-14.8 37.3-6.7 20.3-12.1 46.9-14.5 70.4-1.1 11.5-1.4 47.4-.4 56.9.6 5.8.8 6.1 3.8 6.7 4.4.9 10.5 4.6 14.6 8.9 1.9 2 3.6 3.6 3.8 3.6s5.5-2 11.9-4.5zm-52.6-7.7c-1.1-4.1-1.3-47.2-.3-59.3 3.5-42.1 13.7-81.2 30.8-118.6l3.5-7.8-3.6-7.2c-2-4-3.6-8.1-3.6-9.2 0-1.9-.5-1.9-9.2-1.3-13.9 1-43.4 4.4-60.2 6.8l-14.9 2.2-1.1 5c-2.4 10.3-8.6 18.2-17.3 22.1l-4.2 1.8v7.6c0 15.9 4.7 40 11.9 62.1 12.2 37 30.7 68.4 54.9 93.2l7.5 7.7 3.1-2c1.7-.9 2.9-2.4 2.7-3.1zm365.7-99.5c13.5-45.5 11.8-98.9-4.4-144-4.4-12.2-14.9-34.1-16.6-34.7-.7-.2-2.9-.1-4.8.3-3.5.8-3.5.8-8.6 15.7-9.6 28.1-23 58.1-36 80.9-4.6 8.1-5.5 10.2-4.5 11.5.6.9 2.4 4.1 3.9 7.1 2.3 4.6 2.7 6.9 2.8 13.9l.1 8.4 8.4 6.1c17.4 12.6 48.5 38.6 53.8 45 .8.9 1.8 1.4 2.2.9.4-.5 2.1-5.5 3.7-11.1zm-94.6-37.6c5.2-2.2 7-5 7.5-11.6.4-5.5.2-6.1-3-9.6-8.2-9-22.8-3.4-22.8 8.8 0 10.2 9.1 16.3 18.3 12.4zm-26.3-36.7c0-3.2-14.5-28.9-25.1-44.5-13.5-19.9-39.5-49.7-52-59.6l-3.6-2.8-5.2 2c-6.8 2.6-16.5 2.6-23.4 0-2.9-1.1-5.4-2-5.7-2-1.1 0-27.1 26.4-33.5 34-11.2 13.3-13.9 16.9-13.2 18.3.3.7 1.7 3 3 5.2l2.4 4 19.5 3.2c42.5 7 83.6 19.6 121.2 37.2 13.4 6.1 15.6 6.8 15.6 5zm34.9-17.9c12.5-22.1 25.9-52.2 34.2-77.3l4.2-12.7-4.6-4.3c-9.7-9.1-13.1-24.8-7.9-36.2l2.3-5-5.6-5.2-5.6-5.2-5.2 2.7c-4 2.1-7 2.8-12.8 3-10.5.5-17.7-2.3-24.8-9.6l-5.3-5.4-5.2 1.7c-13 4.2-34.6 13.3-49 20.7l-15.7 8.1v7c0 3.8-.5 8.6-1 10.6l-1 3.6 17.8 18c18.9 19.1 29.3 31.7 42.8 52 7.4 11.1 20.2 33.2 23.5 40.7 1 2.2 2 2.8 5.3 3.1 2.3.2 4.8.5 5.7.6 1.2 0 3.8-3.6 7.9-10.9zm-362.4 7c4.1-2.7 5.5-5.7 5.5-11.7 0-6-2.4-9.8-7.6-12-4.3-1.8-6.8-1.7-11.1.3-9.4 4.5-9.6 19.3-.3 24.1 3.8 1.8 10.1 1.5 13.5-.7zM186 224.2c11.8-9.3 2.9-27.8-11.5-23.9-10.5 2.8-13 17.6-3.9 23.7 4.5 3 11.7 3.1 15.4.2zm88.6-100.7c7.9-5.8 7.3-18.4-1.1-22.8-9.6-5-20.8 2.6-19.6 13.3 1.1 10 12.8 15.3 20.7 9.5zm185.7-.2c7-3.2 9.6-11.6 5.9-18.8-4.3-8.3-18.1-8.4-23-.2-2.3 3.9-2.1 10.5.4 14.6 1.1 1.9 2.2 3.4 2.2 3.4.1 0 2 .7 4.2 1.5 5.3 1.8 5.4 1.8 10.3-.5zm-210.1-38c10.8-6.8 24.5-6.3 36.6 1.6 2.6 1.7 2.8 1.7 9.5-2 17.8-9.8 38.8-19 58.3-25.6 5.2-1.8 9.6-3.3 9.6-3.4.1-.1.4-1.5.8-3.3l.7-3.1-10.8-4.5c-18.4-7.7-34.2-12.1-55.3-15.3-16-2.5-49.1-2.5-65 0-22.4 3.5-43.3 9.6-60.7 17.7-11.5 5.4-11.2 6.6 2 10.9 16.4 5.3 32.2 11.8 48.2 19.8 8.2 4.1 15.9 8.1 17 8.9 2.8 1.8 3.8 1.7 9.1-1.7zM139 69.9c9.5-4 10.7-18.3 1.9-23.7-5-3.1-12.4-2.3-16.5 1.9-5.8 5.8-4.5 17.6 2.4 21 5.4 2.5 7.7 2.7 12.2.8zm261.6.4c14.6-4.2 11.6-26.1-3.5-26-5.1 0-8.3 1.7-11.1 5.9-4.6 6.8-2.2 15.8 5 19.1 4.9 2.2 5.1 2.3 9.6 1z"
            transform="matrix(.99345 0 0 .99322 2.288 1.02)"
        />
    </svg>
)

export default SvgComponent
