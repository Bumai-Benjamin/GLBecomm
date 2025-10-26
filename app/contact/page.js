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
      <main className="contact" style={{padding:'40px 24px'}}>
        <h1>Contact</h1>
        <form id="contact-form" onSubmit={onSubmit}>
          <label>Name<input name="name" required /></label>
          <label>Email<input name="email" type="email" required /></label>
          <label>Message<textarea name="message" rows="6" required></textarea></label>
          <div className="form-actions">
            <button className="btn primary" type="submit">Send</button>
          </div>
        </form>
      </main>
    </Page>
  )
}