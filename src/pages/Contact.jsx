import React, {useEffect} from 'react'
import mountCart from '../components/CartUI'

export default function Contact(){
  useEffect(()=>{mountCart()},[])
  function onSubmit(e){
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get('name'); const email = fd.get('email'); const message = fd.get('message');
    const subject = encodeURIComponent('Contact from '+name);
    const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' <' + email + '>');
    window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
  }
  return (
    <main className="contact">
      <h1>Contact Us</h1>
      <form id="contact-form" onSubmit={onSubmit}>
        <label>Name<input name="name" required /></label>
        <label>Email<input name="email" type="email" required /></label>
        <label>Message<textarea name="message" rows="6" required></textarea></label>
        <div className="form-actions">
          <button className="btn primary" type="submit">Send</button>
        </div>
      </form>
    </main>
  )
}
