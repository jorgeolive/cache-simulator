import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
const layout = (props) => (
    <div>
        <Header headerTitle = {props.headerTitle}></Header>
        <main>
            {props.children}
        </main>
        <Footer></Footer>
    </div>
); 

export default layout;