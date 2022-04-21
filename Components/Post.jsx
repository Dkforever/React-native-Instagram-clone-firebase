import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider, ThemeConsumer } from 'react-native-elements'
import { USERS } from '../data/Users'
import { db, firebase } from '../firebase'



{/*This code is for POST footer icons image */ }

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl: 'https://img.icons8.com/fluency-systems-regular/344/like--v1.png',
    likedImageUrl:'https://img.icons8.com/material/344/fa314a/like--v1.png',
  },
  {
    name: 'Comment',
    imageUrl: 'https://img.icons8.com/ios/344/topic.png',
  },
  {
    name: 'Share',
    imageUrl: 'https://img.icons8.com/external-creatype-blue-field-colourcreatype/344/external-share-user-interface-creatype-blue-field-colourcreatype.png',
  },
  {
    name: 'Save',
    imageUrl: 'https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-favorite-outline-512.png',
  }
]










{/*Actuall code starts from here  */ }

const Post = ({ post }) => {
  const handleLike = post => {
    const currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email
    )
    db.collection('users')
      .doc(post.owner_email)
      .collection('posts')
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus ?
          firebase.firestore.FieldValue.arrayUnion(
            firebase.auth().currentUser.email
          )
          : firebase.firestore.FieldValue.arrayRemove(
            firebase.auth().currentUser.email
          ),
      })
      .then(() => {
        console.log('You liked this post')
      })
      .catch(error => {
        console.log('error updating document :', error)
      })
  }



  return (
    <View style={{ marginBottom: 60 }}>


      <Divider width={1} orientation='vertical' />
      <PostHeader post={post} />
      <PostImage post={post} />

      <PostFooter post={post} handleLike={handleLike} />
      <Likes post={post} />
      <Caption post={post} />
      <CommentSection post={post} />
      <Comments post={post} />




    </View>
  )
}

const PostHeader = ({ post }) => (

  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 5,
      alignItems: 'center',
    }}
  >
    <View style={{ flexDirection: 'row' }}>
      <Image source={{ uri: post.profile_picture }} style={styles.story} />

      <Text style={{ marginLeft: 5, color: 'purple', fontWeight: '700' }}>{post.user}</Text>
    </View>
    <Text style={{ fontWeight: '700', fontSize: 28 }}>...</Text>
  </View>
)



{/* This is Code for Post image where should show the image */ }

const PostImage = ({ post }) => (
  <View style={{ width: '100%', height: 400 }}>
    <Image source={{ uri: post.imageUrl }} style={{ height: '100%', resizeMode: 'cover' }} />
  </View>
)


{/* This is code for Post Footer content Button Like Comment Share */ }

const PostFooter = ({ handleLike, post }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <View style={styles.leftFooterIconsContainer}>
      <TouchableOpacity onPress={() => handleLike(post)}>
        <Image style={styles.icon1}
         source={{ uri: post.likes_by_users.includes(firebase.auth().currentUser.email) ?
            postFooterIcons[0].likedImageUrl 
            : postFooterIcons[0].imageUrl }} />
        
        
        
      </TouchableOpacity>

      <Icon imgStyle={styles.icon1} imgUrl={postFooterIcons[1].imageUrl} />
      <Icon imgStyle={styles.icon1} imgUrl={postFooterIcons[2].imageUrl} />


      {/* This code can be used for like button  Instead of above Button 

         <Image style={styles.icon1}  source={require('../Asset/hearticon1.png')} />
         <Image style={styles.icon1}  source={require('../Asset/comment2.png')} />
         <Image style={[styles.icon1,styles.shareIcon]}  source={require('../Asset/Share.png')} />
     */}

    </View>
    <Image style={[styles.icon1]} source={require('../Asset/save1.png')} />

  </View>
)

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>

    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
)

const Likes = ({ post }) => (
  <View style={{ flexDirection: 'row', marginTop: 4 }}>
    <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 10, }}>
      {post.likes_by_users.length.toLocaleString('en')} likes

    </Text>

  </View>

)

const Caption = ({ post }) => (
  <View style={{ marginTop: 5, flexDirection: 'row' }}>
    <Text style={{ fontWeight: '700', marginLeft: 5, fontSize: 14, }}>{post.user} :</Text>
    <Text style={{ fontWeight: '700', marginLeft: 5 }}>{post.caption}</Text>


  </View>
)


// post.cooment.length give the number 0 1 or any 3 4 5
// 0 we can give False  for this code is   !!post.comment.length 
// 1  true
const CommentSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: 'grey', fontWeight: '700', marginLeft: 5 }}>
        View{post.comments.length > 1 ? 'all' : ''} {post.comments.length}{' '}
        {post.comments.length > 1 ? 'comments' : 'comment'}
      </Text>
    )}
  </View>
)

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index}>
        <Text>
          <Text style={{ flexDirection: 'row', fontSize: 16, color: 'grey', fontWeight: '700', marginRight: 10 }}>  {comment.user}</Text>{'   '}
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
)






const styles = StyleSheet.create({
  story: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: 2,
    borderWidth: 3,
    borderColor: '#ff8501',
  },

  leftFooterIconsContainer: {
    height: 50,
    width: 100,
    flexDirection: 'row',
  },
  icon1: {
    marginTop: 10,
    paddingTop: 10,
    marginLeft: 5,
    width: 45,
    height: 35,
    resizeMode: 'contain',
  },
  rightIcon: {

    justifyContent: 'flex-end',
    flex: 1,

  },
  shareIcon: {
    transform: [{ rotate: '320deg' }],
    marginTop: 5,
  }

})



export default Post;