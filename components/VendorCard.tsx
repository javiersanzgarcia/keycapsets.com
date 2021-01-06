import React from 'react';

import ButtonLink from '../components/ButtonLink';
import { Vendor } from '../types/types';

interface VendorCardProps {
    vendor: Vendor;
}

function VendorCard(props: VendorCardProps): JSX.Element {
    const { vendor } = props;
    const { name, logoUrl, url } = vendor;

    return (
        <a href={url} target="_blank">
            <div className="vendor-card">
                <div className="image">
                    <img
                        src={
                            logoUrl === undefined || logoUrl === ''
                                ? `https://via.placeholder.com/400x300/f2f2f2?text=${name}`
                                : logoUrl
                        }
                        alt={name}
                    />
                </div>

                <div className="details">
                    <div className="horizontal">
                        <div className="left">
                            <h4>{name}</h4>
                        </div>

                        <div className="right">
                            <ButtonLink href={url}>Go to vendor</ButtonLink>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default VendorCard;
