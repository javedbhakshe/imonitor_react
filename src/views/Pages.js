import React, {useState, useEffect} from 'react';
import PageModal from '../components/pages/PageModal';
import PageList from '../components/pages/PageList';
import {communityFAQPages} from '../core/useCommunityBO';
import { apiServices } from '../services/apiServices';
import {getCommunity} from '../core/useCommunityBO';
import _ from 'lodash';

const Pages = () => {
    let pageData = communityFAQPages();
    const [show, setShow] = useState(false);
    const [loading, setLoading] =useState(false);  
    const [pages, setPages] = useState(pageData);
    const [data, setData] = useState({});

    const loadPages = () => {
        let newPage = communityFAQPages();
        setPages(newPage);
    }

    const deletePage =(requestOptions) =>{
        let communityBO  = JSON.parse(localStorage.getItem('community'));
        let communityFAQBOs = communityBO.communityFAQBOs;
        let indexVal = _.findIndex(communityFAQBOs, function(value) { 
            return value['communityPreferences']['id'] == requestOptions['communityPreferences']['active']; 
        });

        requestOptions['communityPreferences']['active'] = 'N';   
        apiServices.createPreferences(communityBO.community.uuid, requestOptions).then(function(response){
            setLoading(false);
            if(response.status === "SUCCESS"){
                communityFAQBOs.splice(indexVal,1);
                communityBO.communityFAQBOs = communityFAQBOs;
                localStorage.setItem('community', JSON.stringify(communityBO));
                loadPages();
            }
        });
    }

    const editPage =(page) => {
        let editData = JSON.parse(page['communityPreferences']['summary']);
        setData(editData);
        setShow(true);
    }
    
    return(
        <div className="card">
            <div className="card-body">
                <PageModal loadPages={loadPages} data={data} show={show} />
                <PageList pages={pages} deletePage={deletePage} editPage={editPage} />
            </div>
        </div>
    )

}

export default Pages;