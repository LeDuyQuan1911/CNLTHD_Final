export const YoutubeItem = (props) =>{
  return(
    <div>
        <div className=''>
          <img className='w-64 h-64' src={props.image} alt="" />
        </div>
        <div className='flex'>
            <img className='w-12 h-12 rounded-full object-cover' src={props.anhnen} alt="" />
            <div>
              <div className="ten_video">{props.tenvideo}</div>
              <div className="ten_tacgia">{props.tentacgia}</div>
            </div>
        </div>
    </div>
  )
}