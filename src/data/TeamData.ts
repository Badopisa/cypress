import { IconType } from "react-icons/lib"
import {FaFacebook, FaLinkedinIn} from 'react-icons/fa'
import {BsTwitter} from 'react-icons/bs'

type TeamDataType = {
    id: number,
    name: string,
    role: string,
    socials: {social: string, link: string, icon: IconType}[],
    image: string
}

export const teams: TeamDataType[] = [
    {
        id: 1,
        name: "Odemakin Elisha",
        role: "Team Lead",
        socials: [
            {
                social: "facebook",
                link: "facebook.com",
                icon: FaFacebook
            },
            {
                social: "twitter",
                link: "twitter.com",
                icon: BsTwitter
            },
            {
                social: "linkedin",
                link: "linkedin.com",
                icon: FaLinkedinIn
            },     
        ],
        image: "/images/image/Team2.png"
    },
    {
        id: 2,
        name: "Ogechukwu Kelvin",
        role: "Designer",
        socials: [
            {
                social: "facebook",
                link: "facebook.com",
                icon: FaFacebook
            },
            {
                social: "twitter",
                link: "twitter.com",
                icon: BsTwitter
            },
            {
                social: "linkedin",
                link: "linkedin.com",
                icon: FaLinkedinIn
            },     
        ],
        image: "/images/image/Team3.png"
    },
    {
        id: 3,
        name: "Bakare Damilare",
        role: "Frontend Dev.",
        socials: [
            {
                social: "facebook",
                link: "facebook.com",
                icon: FaFacebook
            },
            {
                social: "twitter",
                link: "twitter.com",
                icon: BsTwitter
            },
            {
                social: "linkedin",
                link: "linkedin.com",
                icon: FaLinkedinIn
            },     
        ],
        image: "/images/image/Team4.png"
    },
    {
        id: 4,
        name: "Okpe Fumilola",
        role: "Project Manager",
        socials: [
            {
                social: "facebook",
                link: "facebook.com",
                icon: FaFacebook
            },
            {
                social: "twitter",
                link: "twitter.com",
                icon: BsTwitter
            },
            {
                social: "linkedin",
                link: "linkedin.com",
                icon: FaLinkedinIn
            },     
        ],
        image: "/images/image/Team5.png"
    },
]