import React from 'react';

const PageList = props => (
    <table className="table table-bordered translationTable">
        <thead className="thead-light">
            <tr>
                <th width="70px">Sr. No</th>
                <th>Title</th>                
                <th width="140px">Actions</th>
            </tr>
        </thead>
        <tbody>
        {props.pages.length > 0 ? (
            props.pages.map((page, index) => (
            <tr key={page.communityPreferences.id}>
                <td align="center">{index+1}</td>
                <td>{page.communityPreferences.code}</td>
                <td>
                <button className="mr-1 btn btn-primary btn-sm" onClick={ () => props.editPage(page)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={ () => props.deletePage(page)} >Delete</button>
                </td>
            </tr>
            ))
        ) : (
            <tr>
            <td colSpan={3}>No pages</td>
            </tr>
        )}
        </tbody>
    </table>
)

export default PageList;