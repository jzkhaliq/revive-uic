import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const SITE_CONFIG_DOC = doc(db, "config", "site");

export const DEFAULT_SITE_CONFIG = {
  adminEmails: ["reviveatuic@gmail.com"],
  contactEmail: "reviveatuic@gmail.com",
  zelleNumber: "8156704202",
  joinLinks: {
    whatsapp: "https://chat.whatsapp.com/LnQudjWG00OLFVk8O4wqCJ?mode=ems_copy_c",
    linkedin: "https://www.linkedin.com/company/revive-at-uic",
    instagram: "https://www.instagram.com/reviveatuic"
  },
  mentorship: {
    menteeForm: "https://docs.google.com/forms/d/e/1FAIpQLSfsOqmV8DXx21-LFZbUeeAqQ-P0iZAA3O-O_b6A77svbA4RQA/viewform?usp=header",
    mentorForm: "https://docs.google.com/forms/d/e/1FAIpQLScuJuL3_loJw_DPkoDKATtoOLqA2g2hAId6-6IJrPdCuwzfUg/viewform?usp=sharing&ouid=106238069378466152176"
  }
};

export async function fetchSiteConfig() {
  const snap = await getDoc(SITE_CONFIG_DOC);
  if (!snap.exists()) {
    await setDoc(SITE_CONFIG_DOC, DEFAULT_SITE_CONFIG);
    return DEFAULT_SITE_CONFIG;
  }
  const data = snap.data();
  return {
    ...DEFAULT_SITE_CONFIG,
    ...data,
    joinLinks: { ...DEFAULT_SITE_CONFIG.joinLinks, ...(data.joinLinks || {}) },
    mentorship: { ...DEFAULT_SITE_CONFIG.mentorship, ...(data.mentorship || {}) }
  };
}

export async function saveSiteConfig(config) {
  await setDoc(SITE_CONFIG_DOC, config, { merge: true });
}

export function useSiteConfig() {
  const [config, setConfig] = useState(DEFAULT_SITE_CONFIG);

  useEffect(() => {
    let mounted = true;
    fetchSiteConfig()
      .then((value) => {
        if (mounted) setConfig(value);
      })
      .catch((error) => {
        console.error("Failed to load site config:", error);
      });
    return () => { mounted = false; };
  }, []);

  return config;
}
