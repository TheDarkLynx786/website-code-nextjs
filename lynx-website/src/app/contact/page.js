import styles from "@/styles/contact.module.css";
import HeroContact from "@/_components/heroContact";

export default async function Contact() {

  const num1 = Math.floor(Math.random() * 1000);
  const num2 = Math.floor(Math.random()*1000);
  const botCheckTitle = "Bot Check: What's " + num1 + " + " + num2 + "?";

  return (
    <>
      <HeroContact />
      
      <div className={styles.contactFormContainer}>
        <form action="#" id="form" className={styles.contactForm}>

          <h1 className={styles.contactInputTitles} >
            NOTE: This page has no functionality yet. Still setting up a JS Email provider...
            <br />
            Enjoy the cool hero animation for now!
          </h1>

          <div className={styles.contactDiv}> 
              <p className={styles.contactInputTitles}>Name:</p> 
              <input className={styles.contactInput} type="text" name="name" placeholder="Your Name" required />
          </div>
          

          <div className={styles.contactDiv}>
              <p className={styles.contactInputTitles}>Email:</p> 
              <input className={styles.contactInput} type="text" name="email" id="email" placeholder="Your Email" required />
          </div>

          <div className={styles.contactDiv}>
              <p className={styles.contactInputTitles} id="number-label">
                {botCheckTitle}
              </p>
              <input className={styles.contactInput} type="text" id="addition" name="addition" placeholder="Math time!"/>
          </div>
          
          <div className={styles.contactDiv}>
              <p className={styles.contactInputTitles}>
                Have any favorite music? 
                <br /><br />
                Drop the name and artist and I&apos;ll give it a listen:
              </p>   
              <input className={styles.contactInput} type="text" name="music" placeholder="(Optional) Your Favorite Music [Name - Artist-Name]"/>
          </div>
          

          <div className={styles.contactDiv}>
              <p className={styles.contactInputTitles}>Your Message:</p>
              <textarea className={styles.contactInput} resize="none" name="message" rows="4" placeholder="Have something to say? Shoot!" required></textarea>
          </div>

          <div className={styles.contactDiv}>
              <p className={styles.contactInputTitles}>Optional Attachment:</p>
              <input className={`${styles.contactInput} ${styles.fileInput}`}type="file" name="file" id="file" multiple />
          </div>


          <button className={styles.contactSubmitButton} type='submit'>Send</button>


          <div className="loader">
              <i className="lni lni-spinner-solid"></i>
          </div>
          
          <div className="sendoff-msg"></div>
        
        </form>
      
      </div>
    
    </>
  );
}