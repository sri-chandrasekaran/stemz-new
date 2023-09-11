import React from 'react'
import Beaker from '../assets/beaker.png'
import Navbar from '../components/Navbar'
import HeroOther from '../components/HeroOther'
import Footer from '../components/Footer'
import './september.css'
import Maanya2 from '../assets/maanya2.jpg'
import Miriam from '../assets/miriam.jpg'
import Class4 from '../assets/class_4.jpg'


const March = () => {
  return (
    <div>
        <Navbar />
        <HeroOther overlayText="September 2023"/>
        <div className='inside'>
            <h1>Inside Look: Artificial Intelligence</h1>
            <p>Our world is being heavily influenced by the escalating growth of Artificial Intelligence or AI, which is now even available at our fingertips for our disposal. Tools such as facial recognition machines, task automation systems, art generators, and most popular, AI chatbots and natural language processors have taken the world by storm, likely attributed to their easy accessibility and usage, and their potential to serve numerous purposes.</p>

<p>But does AI really have the potential to solve problems that require a proficient level of thinking, along with the ability to judge contextual situations and account for the various factors proposed by the questions asked? </p>

<p>Well, it seems like AI can do this, but it comes with a few drawbacks. Learn more at <a href="https://www.gatesnotes.com/The-Age-of-AI-Has-Begun#ALChapter2" className='hyperlink'>Gates Notes</a>, where you can discover some interesting ideas in the field of AI, and also see how Open AI’s tool—ChatGPT performs while taking an AP Biology test! </p>
        </div>
        <div className='upcoming-other' style={{marginTop:"70px"}}>
            <img src={Class4} alt="Class" className="class-upcoming"/>
            <h1>Upcoming Classes</h1>
            <p>Genetics: September 2nd to September 23rd, Every Saturday</p>
            <p>10 - 11 AM PST</p>
            <p>Register <a href="/online-classes" className='hyperlink'>here</a>!</p>
        </div>
        <div className='milestones' style={{marginTop:"150px"}}>
            <h1>Recent Milestones</h1>
            <p><div className='boldings'>• Celebrating 3 Years of STEMz Learning!</div> Our organization has covered a wide range of STEM subjects and conducted interviews with professionals in the field. With over 15 Zoom courses, we continue to expand our reach as an official 501(c) non-profit committed to providing free education. Thank you for joining us on this incredible journey!</p>
            <p><div className='boldings'>• Our First In-Person Class</div> We teamed up with Broadstone Sports Club on July 14th to host an unforgettable Zoology class, where we taught around 30 amazing kids aged 5-10. Have a look at some of our exciting highlights here! </p>
            <p><div className='boldings'>• High School Chapter Clubs</div> STEMz Learning is proud to announce two new Chapter Clubs at Vista Del Lago High School and Folsom High School, to reach out to more enthusiastic and motivated high schoolers, and continue creating engaging curriculum accessible to all! </p>
            <p><div className='boldings'>• New exciting curriculum</div> We have added three new courses to our Curriculum- Anatomy, Biotechnology, and Genetics. Stay tuned for class updates!</p>
            <p><div className='boldings'>• Concluded our Summer Courses</div> We have concluded our Summer Courses for the year 2023, with classes from Basics of Coding to Microbiology! We received an overwhelming number of participants for all of our courses, and can’t wait for our next series! </p>
            <p><div className='boldings'>• New Leadership</div> Our team has a new set of leaders, leading our growing organization! Find out more on our <a href="/about-us" className='hyperlink'>About Us Page</a></p>

        </div>
        <div className='upcoming'>
            <img src={Beaker} alt="Beaker" className="beaker-pic"/>
            <h1>Upcoming Projects</h1>
            <p>• Developing videos for student/parent led courses</p>
            <p>• Check out "When I Grow Up..." our Interview series on our youtube channel @STEMz Learning</p>
            <p>• Enhancing our curriculum based on feedback received</p>
            <p>• Check out our social media platforms: <a href="https://www.instagram.com/stemzlearning/" className='hyperlink'>Instagram</a>, <a href="https://www.youtube.com/@stemzlearning9856" className='hyperlink'>Youtube</a>, and more!</p>
            <p>• Accepting donations at @STEMz Learning Inc on <a href="https://www.paypal.com/donate?hosted_button_id=8DW4JTSCNYKF4" className='hyperlink'>Paypal</a></p>
        </div>
        <div className='volunteer' style={{marginTop:"120px"}}>
        <h1>Volunteer Spotlight</h1>
        <div className='profiles' style={{marginTop:"70px"}}>
          <div className='profile'>
            <img src={Maanya2} className='profile-img' alt='Maanya Shukla' />
            <h3>Maanya Shukla</h3>
            <h5>School: Folsom HS</h5>
            <h5>Role: Programs Director</h5>
            <p>"This is a beautiful organization that educates kids about science and technology concepts. My passion for science is the main reason why I joined this organization, but working with such an amazing team and kids has made me love it even more."</p>
          </div>
          <div className='profile'>
            <img src={Miriam} className='profile-img' alt='Miriam Ugarcovivi' />
            <h3>Miriam Ugarcovici</h3>
            <h5>School: UC Riverside</h5>
            <h5>Role: Curriculum Creator</h5>
            <p>"I participate in STEMz Learning because I have a passion for both science and teaching. I believe that the goal of introducing and educating STEM topics to younger students is incredibly important in their early education. I think that STEMz Learning introduces many opportunities for students to get excited about their education which will hopefully incite students’ own passion for science and learning more about the world around them. I believe that by being a part of this organization, I have a minor role in this journey and that means a great deal to me."</p>
          </div>
        </div>
        </div>
        <div style={{ paddingBottom: '100px' }} />
        <Footer />
    </div>
  )
}

export default March
