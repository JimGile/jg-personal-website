// src/Contact.js
import React from 'react';
import SectionTitle from './SectionTitle';
import ContactItem from './ContactItem';

function Contact() {
  return (
    <section id="contact" className="bg-white">
        <div className="container mx-auto px-4 md:px-8">
            <SectionTitle>Contact</SectionTitle>
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <ContactItem icon="fas fa-envelope" label="Email">
                            <a href={`mailto:jimgile1@gmail.com`} className="text-blue-600 hover:underline">
                              jimgile1@gmail.com
                            </a>
                        </ContactItem>
                            
                        <ContactItem icon="fas fa-map-marker-alt" label="Location">
                            Denver, CO
                        </ContactItem>
                    </div>
                        
                    <div className="space-y-4">
                        <ContactItem icon="fab fa-linkedin" label="LinkedIn">
                            <a href={`https://www.linkedin.com/in/james-gile`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              linkedin.com/in/james-gile/
                            </a>
                        </ContactItem>
                            
                        <ContactItem icon="fab fa-github" label="GitHub">
                            <a href={`https://github.com/JimGile`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              github.com/JimGile
                            </a>
                        </ContactItem>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default Contact;
