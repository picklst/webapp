import React from 'react';
import shortid from 'shortid';
import Card from "../../../components/ui/Cards";
import Button from "../../../components/ui/Button";

const ProfileCard = ({
    firstName, lastName, username, bio, url, stats,
    isVerified,
    avatarURL, coverURL
}) => {

    const renderStatCard = ({ value, label }) =>
    <div className="mx-3 mx-md-2 text-center">
        <div className="h4 mb-0">{value}</div>
        <b>{label}</b>
    </div>;

    return <Card p={0}>
        <div
            className="rounded-md-top"
            style={{
                backgroundImage: `url("${coverURL}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                paddingTop: '35%'
            }}
        />
        <div className="row bg-white rounded-bottom mx-0 p-2">
            <div className="col-6 px-2 position-relative">
                <img
                    src={avatarURL}
                    alt="Profile Picture"
                    className="position-absolute shadow rounded"
                    style={{
                        width: '25vw',
                        height: '25vw',
                        maxWidth: '150px',
                        maxHeight: '150px',
                        bottom: '2vh'
                    }}
                />
            </div>
            <div className="col-6 d-flex justify-content-end py-2">
                <Button
                    className="btn no-shadow btn-info px-4 rounded"
                    text="Follow"
                />
                <div className="d-md-block d-none">
                    <Button
                        className="btn ml-2 no-shadow btn-primary px-4 rounded"
                        text="Request A List"
                    />
                </div>
            </div>
            <div className="row m-0 w-100">
                <div className="col-md-6 d-flex align-items-center px-2">
                    <div>
                        <h3 className="m-0">
                            {firstName} {lastName}
                            {
                                isVerified ?
                                    <img
                                        className="ml-1"
                                        src={require('../../../images/assets/icons/verified_badge.svg')}
                                        style={{
                                            width: '24px',
                                        }}
                                        alt="Verified Profile"
                                    />
                                : null
                            }
                        </h3>
                        <div>@{username}</div>
                        <p className="my-2">{bio}</p>
                        {
                            url ?
                                <div className="my-2">
                                    <a href={url}>{url}</a>
                                </div> : null
                        }

                    </div>
                </div>
                <div className="col-md-6 p-2 mt-md-0 mt-2 d-flex align-items-start justify-content-md-end justify-content-center">
                    <div className="d-flex">
                    { stats ? stats.map(i => <div key={shortid.generate()}>{renderStatCard(i)}</div>) : null }
                    </div>
                </div>
                <div className="d-md-none d-flex justify-content-center w-100 p-4 my-2">
                    <Button
                        className="btn btn-primary btn-block w-100 py-2 rounded"
                        text="Request A List"
                    />
                </div>
            </div>
        </div>

    </Card>

};

export default ProfileCard;