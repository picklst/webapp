import React, {useEffect} from "react";
import Router, { useRouter } from 'next/router'
import { toast } from 'react-toastify';

import {TokenDelete} from "../../../../utils/authMutations.ts";
import {useAuthState} from "../../../../states";

import MenuRenderer from "../../views/menu/pane";

export default () => {
    const router = useRouter();
    const [UserInfo, setUserInfo] = useAuthState('userInfo');

    useEffect(() => {
        if(UserInfo === null) router.push('/');
    });

    const handleLogout = async () => {
        await TokenDelete({}).then(() => {
            toast.success(
                "Logged you out. See you soon 👋",
                {
                    autoClose: 1000, hideProgressBar: true, closeButton: false,
                    position: toast.POSITION.BOTTOM_CENTER,
                }
            );
            router.push('/');
        })
    };

    const menu = [
        {
            "label": "Preferences",
            "icon": "💅🏻",
            "panes": [
                {
                    "id": "personalization",
                    "label": "Personalization",
                    "icon": "😎",
                    "items": [
                        {
                            "label": "Default List View",
                            "type": "select",
                            "options": [
                                {
                                    "label": "Best Suited (Automatic)"
                                },
                                {
                                    "label": "Card",
                                },
                                {
                                    "label": "Compact Card",
                                },
                                {
                                    "label": "Slide"
                                },
                                {
                                    "label": "Grid"
                                }
                            ]
                        },
                    ]
                },
                {
                    "id": "feed-preferences",
                    "label": "Feed",
                    "icon": "🍽",
                    "sections": [
                        {
                            "label": "Updates from Users Following",
                            "items": [
                                {
                                    "label": "Show New Lists",
                                    "type": "switch"
                                },
                                {
                                    "label": "Show Contributions",
                                    "type": "switch"
                                },
                            ]
                        },
                        {
                            "label": "Updates from Topics Following",
                            "items": [
                                {
                                    "label": "Show Featured Lists",
                                    "type": "switch",
                                },
                            ]
                        },
                    ]
                },
                {
                    "id": "notification-preferences",
                    "label": "Notification",
                    "icon": "📣",
                    "sections": [
                        {
                            "label": "Push Notifications",
                            "icon": "🔔",
                            "items": [
                                {
                                    "label": "Reactions to Items in Your List",
                                    "type": "switch"
                                },
                            ]
                        },
                        {
                            "label": "Email Notifications",
                            "icon": "📧",
                            "items": [
                                {
                                    "label": "Receive Weekly Digest",
                                    "icon": "🗞",
                                    "type": "switch"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "label": "Privacy",
            "icon": "🙈",
            "items": [
                {
                    "label": "Blocked Accounts",
                    "icon": "🧯",
                    "type": "module",
                },
                {
                    "label": "Access & Download Data",
                    "icon": "🗃",
                    "type": "module",
                },
                {
                    "label": "Request Account Deletion",
                    "icon": "🚽",
                    "type": "module",
                }
            ],
            "sections": [
                {
                    "label": "Account",
                    "icon": "🕹",
                    "items": [
                        {
                            "label": "Private Account",
                            "description": "When your account is made private, only people you approve can see your lists. Your existing followers wont be affected.",
                            "type": "switch"
                        },
                        {
                            "label": "Anonymize Contributions",
                            "description": "When your contributions are made private, all including your existing contributions shall be left unattributed, and users wont be able to know that you contributed it.",
                            "type": "switch"
                        }
                    ]
                },
                {
                    "label": "Discovery",
                    "icon": "👣",
                    "items": [
                        {
                            "label": "Appear in Search Results",
                            "description": "Your public profile will still be visible with the link but however unlisted from search, if you choose not to appear in search results.",
                            "type": "switch"
                        },
                        {
                            "label": "Allow Mentions by Any User",
                            "type": "switch"
                        },
                        {
                            "label": "Allow Mentions by Your Followers",
                            "type": "switch"
                        }
                    ]
                },
            ]
        },
        {
            "label": "Security",
            "icon": "🕵️‍♂️",
            "items": [
                {
                    "icon": "🗝",
                    "label": "Change Your Password",
                    "type": "module",
                },
                {
                    "icon": "🛎",
                    "label": "Login Activity",
                    "type": "module",
                },
            ]
        },
        {
            "label": "Help",
            "icon": "🤝️",
            "items": [
                {
                    "label": "Report a Problem",
                    "icon": "🐞",
                    "menu": [
                        {
                            "label": "Send Feedback",
                        }
                    ]
                },
                {
                    "label": "Privacy & Security Help",
                    "icon": "📑",
                }
            ]
        },
        {
            "label": "Information",
            "icon": "🧾",
            "items": [
                {
                    "label": "Privacy Policy",
                    "icon": "🔑",
                    "link": "/policies/privacy"
                },
                {
                    "label": "Terms of Use",
                    "icon": "⚔",
                    "link": "/policies/terms-of-use"
                },
                {
                    "label": "Attributions & Credits",
                    "icon": "🎁",
                    "link": "https://github.com/picklst/thanks/"
                },
                {
                    "label": "Version",
                    "icon": "🧬",
                    "text": "Ver. 1.0.0"
                }
            ]
        },
        {
            "label": "Logout",
            "icon": "👋",
            "type": "button",
            "onClick": handleLogout,
        }
    ];

    return <div>
        {UserInfo ?
            <MenuRenderer
                label="Settings"
                onRender={() => {
                }}
                showTopBar
                onExit={() => { Router.back() }}
                panes={menu}
            /> :
            <div className="min-vh-100 align-items-center d-flex justify-content-center text-center">
                <h4 className="mb-2">You need to be logged-in to view this page.</h4>
            </div>
        }
    </div>

}