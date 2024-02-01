import getCurrentUser from '../actions/getCurrentUser'
import CreatorBox from './components/CreatorBox';
import SearchBar from './components/SearchBar';

const Home = async ()=> {
    const user = await getCurrentUser();
    const creators = [{
      "_id": {
        "$oid": "65855ab47b2f344ceee60a9c"
      },
      "email": "rushigandhi14@gmail.com",
      "password": "$2b$10$KbpfNU8820cQJHRBh2GGmOhKEa57ZSGNCBJoPrC/ULZ8D/3cbzjWi",
      "fullName": "Rushi Gandhi",
      "emailVerified": true,
      "phoneVerified": false,
      "createdAt": {
        "$date": {
          "$numberLong": "1703238324891"
        }
      },
      "updatedAt": {
        "$date": {
          "$numberLong": "1705841278421"
        }
      },
      "phoneNumber": "7359044104",
      "username": "rushigandhi14",
      "bio": "Enthusiastic and dedicated pre-final year student studying in Dharmsinh Desai University, Gujarat. Active learner and good at adapting new technologies. Gained experience in Web, App and Blockchain technologies by working in college clubs and participating in hackathons. Aspires to build scalable and business analystics solutions using advanced tools and technologies in software industry.",
      "title": "Youtuber | Creator | Enterpreneur",
      "languagesSpoken": [
        "English"
      ],
      "categories": [
        "audio"
      ],
      "subCategories": [
        "Blog Posts"
      ],
      "city": "Kheda",
      "state": "Gujarat",
      "country": "India",
      "charges": 10,
      "unit": "PER_VIDEO",
      "availability": true
    },{
      "_id": {
        "$oid": "658e9a1722513a654f0ff970"
      },
      "email": "hari@gmail.com",
      "password": "$2b$10$EnLm3EgYIXoHbaedcw4f/uA7KC88UefE8ns7YiITLIS7T3Dfnz9li",
      "fullName": "pizz Har",
      "emailVerified": false,
      "phoneVerified": false,
      "createdAt": {
        "$date": {
          "$numberLong": "1703844375656"
        }
      },
      "updatedAt": {
        "$date": {
          "$numberLong": "1703844375656"
        }
      }
    },{
      "_id": {
        "$oid": "65a5afd6ee76027e2d7f7d16"
      },
      "email": "fwork050@gmail.com",
      "password": "$2b$10$XFLgf6JO2LrS.scdrh/QQeT4I0P84nje9.3fZQsbFQm7WAaBJh5Fe",
      "fullName": "Austin Kaynapp",
      "emailVerified": true,
      "phoneVerified": false,
      "createdAt": {
        "$date": {
          "$numberLong": "1705357270558"
        }
      },
      "updatedAt": {
        "$date": {
          "$numberLong": "1705363588228"
        }
      }
    },{
      "_id": {
        "$oid": "65a617f7a832e457639e6b81"
      },
      "email": "sublimshrey@gmail.com",
      "password": "$2b$10$fjwxJCeTBp5pa.9GH4NO8.eFjo3LNK7XVrFNOopHG3jaTd.RKwjmy",
      "fullName": "Shreyas Gavit",
      "emailVerified": false,
      "phoneVerified": false,
      "createdAt": {
        "$date": {
          "$numberLong": "1705383927513"
        }
      },
      "updatedAt": {
        "$date": {
          "$numberLong": "1705383927513"
        }
      }
    }]
  return (
    <>
        <div className="text-2xl font-semibold my-4">Hi, {user?.personName} 👋</div>
        <div className='my-5 w-3/5'>
          <SearchBar/>
        </div>
        {
          creators.map((creator, index)=>(
            <CreatorBox key={index} creator={creator}/>
          ))
        }
    </>
  )
}

export default Home