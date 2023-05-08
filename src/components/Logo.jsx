const Logo = ({...props}) => {
  return (
    <a
      style={{ position: 'fixed', top: '10px', left: '10px' }}
      href="https://github.com/buschenyy"
      target="_blank"
      rel="author"
      title="Author's GitHub"
      {...props}
    >
      <svg
        width="58"
        height="51"
        viewBox="0 0 58 51"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.36 4.896C10.56 4.896 11.648 5.176 12.624 5.736C13.616 6.28 14.392 7.056 14.952 8.064C15.512 9.056 15.792 10.216 15.792 11.544C15.792 12.872 15.512 14.04 14.952 15.048C14.392 16.04 13.616 16.816 12.624 17.376C11.648 17.92 10.56 18.192 9.36 18.192C7.584 18.192 6.232 17.632 5.304 16.512V18H1.728V0.191999H5.472V6.456C6.416 5.416 7.712 4.896 9.36 4.896ZM8.712 15.12C9.672 15.12 10.456 14.8 11.064 14.16C11.688 13.504 12 12.632 12 11.544C12 10.456 11.688 9.592 11.064 8.952C10.456 8.296 9.672 7.968 8.712 7.968C7.752 7.968 6.96 8.296 6.336 8.952C5.728 9.592 5.424 10.456 5.424 11.544C5.424 12.632 5.728 13.504 6.336 14.16C6.96 14.8 7.752 15.12 8.712 15.12ZM33.0343 5.088V18H29.4823V16.464C28.9863 17.024 28.3943 17.456 27.7063 17.76C27.0183 18.048 26.2743 18.192 25.4743 18.192C23.7783 18.192 22.4343 17.704 21.4423 16.728C20.4503 15.752 19.9543 14.304 19.9543 12.384V5.088H23.6983V11.832C23.6983 13.912 24.5703 14.952 26.3143 14.952C27.2103 14.952 27.9303 14.664 28.4743 14.088C29.0183 13.496 29.2903 12.624 29.2903 11.472V5.088H33.0343ZM6.072 32.192C5 32.192 3.952 32.064 2.928 31.808C1.904 31.536 1.088 31.2 0.48 30.8L1.728 28.112C2.304 28.48 3 28.784 3.816 29.024C4.632 29.248 5.432 29.36 6.216 29.36C7.8 29.36 8.592 28.968 8.592 28.184C8.592 27.816 8.376 27.552 7.944 27.392C7.512 27.232 6.848 27.096 5.952 26.984C4.896 26.824 4.024 26.64 3.336 26.432C2.648 26.224 2.048 25.856 1.536 25.328C1.04 24.8 0.792 24.048 0.792 23.072C0.792 22.256 1.024 21.536 1.488 20.912C1.968 20.272 2.656 19.776 3.552 19.424C4.464 19.072 5.536 18.896 6.768 18.896C7.68 18.896 8.584 19 9.48 19.208C10.392 19.4 11.144 19.672 11.736 20.024L10.488 22.688C9.352 22.048 8.112 21.728 6.768 21.728C5.968 21.728 5.368 21.84 4.968 22.064C4.568 22.288 4.368 22.576 4.368 22.928C4.368 23.328 4.584 23.608 5.016 23.768C5.448 23.928 6.136 24.08 7.08 24.224C8.136 24.4 9 24.592 9.672 24.8C10.344 24.992 10.928 25.352 11.424 25.88C11.92 26.408 12.168 27.144 12.168 28.088C12.168 28.888 11.928 29.6 11.448 30.224C10.968 30.848 10.264 31.336 9.336 31.688C8.424 32.024 7.336 32.192 6.072 32.192ZM21.078 32.192C19.702 32.192 18.462 31.912 17.358 31.352C16.27 30.776 15.414 29.984 14.79 28.976C14.182 27.968 13.878 26.824 13.878 25.544C13.878 24.264 14.182 23.12 14.79 22.112C15.414 21.104 16.27 20.32 17.358 19.76C18.462 19.184 19.702 18.896 21.078 18.896C22.438 18.896 23.622 19.184 24.63 19.76C25.654 20.32 26.398 21.128 26.862 22.184L23.958 23.744C23.286 22.56 22.318 21.968 21.054 21.968C20.078 21.968 19.27 22.288 18.63 22.928C17.99 23.568 17.67 24.44 17.67 25.544C17.67 26.648 17.99 27.52 18.63 28.16C19.27 28.8 20.078 29.12 21.054 29.12C22.334 29.12 23.302 28.528 23.958 27.344L26.862 28.928C26.398 29.952 25.654 30.752 24.63 31.328C23.622 31.904 22.438 32.192 21.078 32.192ZM37.2257 18.896C38.8257 18.896 40.1137 19.376 41.0897 20.336C42.0817 21.296 42.5777 22.72 42.5777 24.608V32H38.8337V25.184C38.8337 24.16 38.6097 23.4 38.1617 22.904C37.7137 22.392 37.0657 22.136 36.2177 22.136C35.2737 22.136 34.5217 22.432 33.9617 23.024C33.4017 23.6 33.1217 24.464 33.1217 25.616V32H29.3777V14.192H33.1217V20.432C33.6177 19.936 34.2177 19.56 34.9217 19.304C35.6257 19.032 36.3937 18.896 37.2257 18.896ZM51.2961 29.192C51.9681 29.192 52.5601 29.096 53.0721 28.904C53.6001 28.696 54.0881 28.376 54.5361 27.944L56.5281 30.104C55.3121 31.496 53.5361 32.192 51.2001 32.192C49.7441 32.192 48.4561 31.912 47.3361 31.352C46.2161 30.776 45.3521 29.984 44.7441 28.976C44.1361 27.968 43.8321 26.824 43.8321 25.544C43.8321 24.28 44.1281 23.144 44.7201 22.136C45.3281 21.112 46.1521 20.32 47.1921 19.76C48.2481 19.184 49.4321 18.896 50.7441 18.896C51.9761 18.896 53.0961 19.16 54.1041 19.688C55.1121 20.2 55.9121 20.952 56.5041 21.944C57.1121 22.92 57.4161 24.08 57.4161 25.424L47.8641 27.272C48.1361 27.912 48.5601 28.392 49.1361 28.712C49.7281 29.032 50.4481 29.192 51.2961 29.192ZM50.7441 21.728C49.8001 21.728 49.0321 22.032 48.4401 22.64C47.8481 23.248 47.5361 24.088 47.5041 25.16L53.7921 23.936C53.6161 23.264 53.2561 22.728 52.7121 22.328C52.1681 21.928 51.5121 21.728 50.7441 21.728ZM9.576 32.896C11.176 32.896 12.464 33.376 13.44 34.336C14.432 35.296 14.928 36.72 14.928 38.608V46H11.184V39.184C11.184 38.16 10.96 37.4 10.512 36.904C10.064 36.392 9.416 36.136 8.568 36.136C7.624 36.136 6.872 36.432 6.312 37.024C5.752 37.6 5.472 38.464 5.472 39.616V46H1.728V33.088H5.304V34.6C5.8 34.056 6.416 33.64 7.152 33.352C7.888 33.048 8.696 32.896 9.576 32.896ZM28.6898 33.088V43.84C28.6898 46.208 28.0898 47.968 26.8898 49.12C25.6898 50.272 23.9457 50.848 21.6577 50.848C20.4417 50.848 19.2897 50.696 18.2017 50.392C17.1297 50.088 16.2257 49.648 15.4897 49.072L16.9777 46.384C17.5217 46.832 18.1857 47.184 18.9697 47.44C19.7537 47.696 20.5458 47.824 21.3458 47.824C22.5938 47.824 23.5057 47.536 24.0818 46.96C24.6578 46.384 24.9458 45.504 24.9458 44.32V43.888C24.4658 44.368 23.8978 44.736 23.2418 44.992C22.5858 45.248 21.8818 45.376 21.1298 45.376C19.4337 45.376 18.0897 44.896 17.0977 43.936C16.1057 42.96 15.6097 41.504 15.6097 39.568V33.088H19.3537V39.016C19.3537 41.112 20.2257 42.16 21.9698 42.16C22.8658 42.16 23.5858 41.872 24.1298 41.296C24.6738 40.704 24.9458 39.832 24.9458 38.68V33.088H28.6898ZM42.5263 33.088V43.84C42.5263 46.208 41.9263 47.968 40.7263 49.12C39.5263 50.272 37.7823 50.848 35.4943 50.848C34.2783 50.848 33.1263 50.696 32.0383 50.392C30.9663 50.088 30.0623 49.648 29.3263 49.072L30.8143 46.384C31.3583 46.832 32.0223 47.184 32.8063 47.44C33.5903 47.696 34.3823 47.824 35.1823 47.824C36.4303 47.824 37.3423 47.536 37.9183 46.96C38.4943 46.384 38.7823 45.504 38.7823 44.32V43.888C38.3023 44.368 37.7343 44.736 37.0783 44.992C36.4223 45.248 35.7183 45.376 34.9663 45.376C33.2703 45.376 31.9263 44.896 30.9343 43.936C29.9423 42.96 29.4463 41.504 29.4463 39.568V33.088H33.1903V39.016C33.1903 41.112 34.0623 42.16 35.8063 42.16C36.7023 42.16 37.4223 41.872 37.9663 41.296C38.5103 40.704 38.7823 39.832 38.7823 38.68V33.088H42.5263Z" />
      </svg>
    </a>
  )
}

export default Logo
