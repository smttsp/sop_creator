import TitleCard from "./TitleCard";
import ResumeImage from "./ResumeImages";

const Attraction = () => {
  return (
    <div className="grid grid-cols-2 bg-white bg-opacity-30 gap-4 px-4 mt-32 py-4">
      <ResumeImage imageUrl={"/resume-double-image.png"} alt={"double resume image"}/>
      <TitleCard
        upper={"Your dream"}
        middle={"Job is"}
        lower={" one click away"}
        elaboration={"Our platform isn't just about building resumes; it's your express ticket to landing interviews and opening the door to your dream job. Craft a standout resume effortlessly, making each click a step closer to the career you've always envisioned."
        }
      />
      <TitleCard
        upper={"Crafting careers"}
        middle={"One resume"}
        lower={"At a time"}
        elaboration={
          "We go beyond crafting mere resumes; we sculpt entire careers. Picture your job application rising above the rest, not just as a document but as a powerful representation of your capabilities. Our resume builder empowers you to elevate your professional identity, ensuring that employers see not just qualifications, but the essence of your career journey."
        }
      />
       
    <ResumeImage imageUrl={"/multiple-show-resume-image.webp"} alt={"double resume image"}/>
    <ResumeImage imageUrl={"/resume-double-image.png"} alt={"double resume image"}/>
    <TitleCard
    upper={"Unlock"}
    middle={"your potential"}
    lower={"with our resume builder"}
    elaboration={
        "Start a transformative journey with our resume builder. Craft a narrative that defines you, leveraging our intuitive tools to showcase your skills, experiences, and aspirations. Our platform isn't just about resumes; it's a dynamic space where your professional story unfolds, setting the stage for a future of possibilities."
    }
    />


    <TitleCard
    upper={"Stand out"}
    middle={"in a sea of"}
    lower={"applicants"}
    elaboration={
        "Our cover letter generator turns your words into career magic.Navigate the competitive sea of applicants with confidence. Our cover letter generator is more than a tool; it's an enchanting spell that transforms your words into a compelling narrative. Stand out, captivate employers, and let your application shine with the magic of a well-crafted cover letter."
    }
    />
   
   <ResumeImage imageUrl={"/resume-double-image.png"} alt={"double resume image"}/>
    <ResumeImage imageUrl={"/resume-double-image.png"} alt={"double resume image"}/>
    <TitleCard
        upper={"Say goodbye"}
        middle={"To generic"}
        lower={"Resumes"}
        elaboration={
          "Welcome to a world where your uniqueness takes center stage.Bid farewell to generic resumes that fade into the background. Step into a world where your uniqueness is not just acknowledged but celebrated. Our platform empowers you to create resumes that go beyond the ordinary, reflecting your distinctive strengths and personality. Embrace the spotlight where your individuality takes center stage."
        }
      />
      <TitleCard
        upper={"Say goodbye"}
        middle={"To generic"}
        lower={"Resumes"}
        elaboration={
          "Welcome to a world where your uniqueness takes center stage.Bid farewell to generic resumes that fade into the background. Step into a world where your uniqueness is not just acknowledged but celebrated. Our platform empowers you to create resumes that go beyond the ordinary, reflecting your distinctive strengths and personality. Embrace the spotlight where your individuality takes center stage."
        }
      />


    <ResumeImage imageUrl={"/multiple-show-resume-image.webp"} alt={"double resume image"}/>
    <ResumeImage imageUrl={"/resume-double-image.png"} alt={"double resume image"}/>
    <TitleCard
        upper={"Say goodbye"}
        middle={"To generic"}
        lower={"Resumes"}
        elaboration={
          "Welcome to a world where your uniqueness takes center stage.Bid farewell to generic resumes that fade into the background. Step into a world where your uniqueness is not just acknowledged but celebrated. Our platform empowers you to create resumes that go beyond the ordinary, reflecting your distinctive strengths and personality. Embrace the spotlight where your individuality takes center stage."
        }
      />
    <TitleCard
        upper={"Say goodbye"}
        middle={"To generic"}
        lower={"Resumes"}
        elaboration={
          "Welcome to a world where your uniqueness takes center stage.Bid farewell to generic resumes that fade into the background. Step into a world where your uniqueness is not just acknowledged but celebrated. Our platform empowers you to create resumes that go beyond the ordinary, reflecting your distinctive strengths and personality. Embrace the spotlight where your individuality takes center stage."
        }
      />
    <ResumeImage imageUrl={"/resume-double-image.png"} alt={"double resume image"}/>
   
    
    </div>
  );
};

export default Attraction;
