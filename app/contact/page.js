'use client'

import React, {useEffect} from 'react'
import mountCart from '../../src/components/CartUI'
import Page from '../../src/components/Page'

export default function Contact(){
  useEffect(()=>{mountCart()},[])
  function onSubmit(e){
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get('name'); const email = fd.get('email'); const message = fd.get('message');
    const subject = encodeURIComponent('Contact from '+name);
    const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' <' + email + '>');
  window.location.href = `mailto:hello@giveloveback.com?subject=${subject}&body=${body}`;
  }
  return (
    <Page>
      <main className="contact" style={{padding:'120px 40px 60px',minHeight:'100vh'}}>
        <h1>GET IN TOUCH</h1>
        <form id="contact-form" onSubmit={onSubmit}>
          <label>
            NAME
            <input name="name" required />
          </label>
          <label>
            EMAIL
            <input name="email" type="email" required />
          </label>
          <label>
            MESSAGE
            <textarea name="message" rows="8" required></textarea>
          </label>
          <div className="form-actions">
            <button className="btn primary" type="submit">Send Message</button>
          </div>
        </form>
      </main>
    </Page>
  )
}