export const themes = {
    palette: {
      primary:{
        light:'#29b6f6',
        main:'#039be5',
        dark:'#0277bd',
        contrastText:'#fff'
      },
      secondary:{
        light:'#ff6333',
        main:'#ff3d00',
        dark:'#b22a00',
        contrastText:'#fff'
      }
    },
    spreadThis:{
      typography:{
        useNextVariants: true,
      },
      form:{
        textAlign: 'center'
      },
      image:{
          margin:'20px auto 10px auto',
          height:'20%',
          width:'20%' 
      },
      pageTitle:{
          margin: '10px auto 10px auto',
      },
      textField:{
          margin: '10px auto 10px auto',
      },
      button:{
          marginTop:20,
          position: 'relative'
      },
      customError:{
          color:"#f44336",
          fontSize: '0.8rem',
          marginTop: '10px',
      },
      progress:{
          position:'absolute',
      },
      invisibleSeparator:{
        border: 'none',
        margin: 4
      },
      visibleSeparator:{
        width:'100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom:  20
      },
      card:{
      display:'flex',
      marginBottom: 20,
      },
      cardContent:{
        width:'100%',
        flexDirection:'column',
        padding:25
      },
      cover:{
        minWidth:200,
        objectFit:'cover'
      },
      handle:{
        width:60,
        height:19.5,
        backgroundColor: '#039be5',
        marginTop:3,
        marginBottom:7
      },
      date:{
        width:100,
        height:14,
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginBottom:10
      },
      fullLine:{
        width:'90%',
        height:15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        marginBottom:10
      },
      halfLine:{
        width:'50%',
        height:15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        marginBottom:10
      },
      paper: {
        padding: 20
      },
      profile: {
          '& .image-wrapper': {
              textAlign: 'center',
              position: 'relative',
              '& button': {
              position: 'absolute',
              top: '80%',
              left: '70%'
              }
          },
          '& .profile-image': {
              width: 200,
              height: 200,
              objectFit: 'cover',
              maxWidth: '100%',
              borderRadius: '50%'
          },
          '& .profile-details': {
              textAlign: 'center',
              '& span, svg': {
              verticalAlign: 'middle'
              },
              '& a': {
              color: '#00bcd4'
              }
          },
          '& hr': {
              border: 'none',
              margin: '0 0 10px 0'
          },
          '& svg.button': {
              '&:hover': {
              cursor: 'pointer'
              }
          }
      },
      buttons: {
          textAlign: 'center',
          '& a': {
              margin: '20px 10px'
          }
      }
    },
  }