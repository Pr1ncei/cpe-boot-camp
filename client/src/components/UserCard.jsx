import React from 'react'
import "../styles/UserCardStyles.css"

export default function UserCard({username, bio, tweetCount}) {
    return (
        <div class="background">  
            <div className='card'>
                <div className='card-username'>{username}</div>
                <div className='card-bio'>{bio}</div>
                <div className='card-tweetcount'>Tweet Count: {tweetCount}</div>
            </div>
        </div>
        
    )


}
