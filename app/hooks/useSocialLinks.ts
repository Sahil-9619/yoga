"use client";
import { useState, useEffect } from 'react';
import { SocialService, SocialLinks } from '../services/social.service';

const EMPTY: SocialLinks = { facebook: '', instagram: '', youtube: '' };

export function useSocialLinks() {
  const [links, setLinks] = useState<SocialLinks>(EMPTY);

  useEffect(() => {
    SocialService.getLinks()
      .then(data => setLinks({
        facebook: data.facebook || '',
        instagram: data.instagram || '',
        youtube: data.youtube || '',
      }))
      .catch(() => {});
  }, []);

  return links;
}
