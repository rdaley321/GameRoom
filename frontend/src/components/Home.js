import React from 'react'
import Sky from 'react-sky';
import img1 from '../images/fortnite-png-31.jpg'
import img2 from '../images/transparent-rocket-fortnite-1.png'
import img3 from '../images/fishhead.png'
import img4 from '../images/fortnite-transparent-skydiving-3.png'

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome</h1>
      <h1>Please Log In or Create an Account</h1>
      <Sky
          images={{
            0: img1,
            1: img2,
            2: img3,
            3: img4
          }}
          how={50}
          time={40}
          size={'100px'}
        />
    </div>
  )
}

export default Home
