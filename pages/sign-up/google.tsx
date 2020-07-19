import React, { useState } from 'react';
import { Router } from 'next/router';
import withGA from 'next-ga';

import Heading from '../../components/Heading';
import GoogleAuth from '../../components/GoogleAuth';
import Checkbox from '../../components/Checkbox';

function SignUpGoogle() {
    const [agreedTerms, setAgreedTerms] = useState<boolean>(false);

    return (
        <div className="page google-sign-up">
            <div className="container">
                <Heading mainTitle="Sign up with Google" subTitle="Favorite your sets and stay up to date!" left />

                <div className="features-container">
                    <h3>Features</h3>
                    <ul className="features">
                        <li>Favorite sets, see your collection. </li>
                        <li>Create your own collections for e.g. your board. *</li>
                        <li>Opt into groupbuy updates via mail. *</li>
                        <li>Upload a keycapset. *</li>
                        <li>Collect IC votes. *</li>
                        <li>Get a full fledged designed page for your set. *</li>
                        <li>Sign up to a calender feed. *</li>
                        <li>Hook up to vendors to get your MOQ data in one place. *</li>
                    </ul>
                </div>

                <p className="light small-width alinea">
                    By creating an account via Google you're able to favorite keycapsets and have a simple overview of
                    what you like and might want to use for your next build. You could vote on ICs. * You could opt-in
                    on recieving weekly or monthly updates via email. *
                </p>

                <p className="light small-width alinea">
                    Are you a designer? Sign up and upload your sets. Collect IC votes and get a beautiful (partly self
                    designed) page to promote your sets on various platforms! *
                </p>

                <p className="light small-width alinea">
                    Are you a vendor? Sign up and let users know you exist! Are you a vendor designing sets? Obviously
                    all the above apply for you aswell! *
                </p>

                <p className="light small-width alinea">* Feature coming soon!</p>

                <div className="">
                    <Checkbox
                        checked={agreedTerms}
                        label="I agree the terms and conditions"
                        getVal={(val: boolean) => setAgreedTerms(val)}
                    />
                    <GoogleAuth disabled={!agreedTerms} text="Login with Google" />
                </div>
            </div>
        </div>
    );
}

export default withGA('UA-115865530-2', Router)(SignUpGoogle);
