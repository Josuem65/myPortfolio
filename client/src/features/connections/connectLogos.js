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
        paragraph: "Click to the left to checkout my Github profile! I'd appreciate and return a follow, as the connection with like-minded people is always welcome. With the focus on algorithms and data structures, doing Leetcode problems, and local git branches, I've slacking on pushing to git remote branches... watch me become better about this. See you on Github.",
    },
    {
        id: 2,
        profilePath: '/JosueMartinez',
        caption: 'Connect with me on LinkedIn',
        link: 'https://www.linkedin.com/in/josue-martinez-04ba2a1b6/', // Update this link to your LinkedIn profile
        image: linkedIn,
        profileURL: profilePic,
        paragraph: "See you on LinkedIn! I'll see if you checked out my profile, you might as well give a follow. Not to repeat the paragraph above, but let's connect. I'd much rather see more developers on my feed than sales reps, managers, and sales district managers.",
    }
];

export default connectObj;