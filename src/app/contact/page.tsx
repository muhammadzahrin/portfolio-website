import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { ContactBubbles } from '@/components/contact/ContactBubbles';

export const metadata: Metadata = {
  title: 'Contact | Zahrin',
  description: 'Contact Zahrin by email, LinkedIn, GitHub, YouTube or itch.io.',
};

export default function ContactPage() {
  return (
    <div className="pb-10">
      <PageHeader
        title="Contact"
        subtitle="Connect for collaboration on software, interactive media, or game development."
      />
      <ContactBubbles />
    </div>
  );
}
