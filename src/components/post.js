//import React from 'react'
import {documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS,INLINES } from '@contentful/rich-text-types';

export default function Post({title,date,img,body}) {
    let dateString=new Date(date)
    const Bold = ({ children }) => <span className="bold">{children}</span>;

const Text = ({ children }) => <p className="align-center">{children}</p>;

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    
  },
  renderNode:{
      [INLINES.ASSET_HYPERLINK]:(node,children)=><a href={children} target='_blank'>{children}</a>
  }
};

  return (
    <div className="col-md-8 col-sm-11 mx-auto">
        <div className="card">
            <p className="text-center text-capitalize fw-bold fs-3">{title}</p>
            <p className='grey-text'>{dateString.getDate()+'/'+'/'+dateString.getMonth()+1+'/'+ dateString.getFullYear()}</p>
            <img className="card-img" src={img} alt='img' width={100} height={300}/>
            <div className="card-body text-center">
           { documentToReactComponents(body, options)}
            </div>
        </div>
    </div>
  )
}
