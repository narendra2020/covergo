import React from 'react';
import {Link} from 'react-router-dom';

const WelcomeComponent = (props: any) => {
	return <>
		 <section className='welcome section'>
      <h1 className='title'>Hello There!</h1>
      <div>
        <p>Let's buy some insurance. It is going to take only few steps.</p>
        <Link to="/start"><button className='next-btn'>Start</button></Link>
      </div>
    </section>
	</>;
}

export default WelcomeComponent;