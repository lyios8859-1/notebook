import React from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
function Details () {
  let { path, url } = useRouteMatch();
  console.log(path, url)
  let { id } = useParams();
  return (
    <div className="details">
      某个用户详细信息: {id}
    </div>
  )
  
}

export default Details;
