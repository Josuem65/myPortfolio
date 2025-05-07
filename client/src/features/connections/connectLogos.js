import gitHub from '../../logos/gitHubLogo.png';
import linkedIn from '../../logos/linkedInLogo.png';
import profilePic from '../../profilePics/linkedInProfilePic_1.jpg';

const connectObj = [
    {
        id: 1,
        profilePath: '/Josuem65',
        caption: 'Connect with me on GitHub',
        link: 'https://github.com/Josuem65',
        image: gitHub,
        profileURL: "https://avatars.githubusercontent.com/u/66807970?v=4",
        paragraph: "I've listed a few of my projects on this site ('myPortolio') but to see all of my projects, including what I'm currently working, click to the left to checkout my Github profile!",
    },
    {
        id: 2,
        profilePath: '/JosueMartinez',
        caption: 'Connect with me on LinkedIn',
        link: 'https://www.linkedin.com/in/josue-martinez-04ba2a1b6/', // Update this link to your LinkedIn profile
        image: linkedIn,
        profileURL: profilePic,
        paragraph: "Connect with me on LinkedIn! I look forward to hearing from you about any questions, feedback, or work/collaboration opportunities you may have. See you there!",
    }
];

export default connectObj;