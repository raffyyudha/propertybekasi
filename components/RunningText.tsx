
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const RunningText: React.FC = () => {
    const [text, setText] = useState('');

    useEffect(() => {
        const fetchText = async () => {
            const { data } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'running_text')
                .single();

            if (data) setText(data.value);
        };

        fetchText();

        // Optional: Realtime subscription to update immediately
        const subscription = supabase
            .channel('site_settings')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'site_settings', filter: "key=eq.running_text" }, (payload) => {
                setText(payload.new.value);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        }
    }, []);

    if (!text) return null;

    return (
        <div className="bg-[#020617] text-white overflow-hidden py-2 relative z-[101]">
            <div className="whitespace-nowrap animate-marquee inline-block">
                <span className="mx-4 font-bold text-xs uppercase tracking-widest">{text}</span>
                <span className="mx-4 font-bold text-xs uppercase tracking-widest text-emerald-500">•</span>
                <span className="mx-4 font-bold text-xs uppercase tracking-widest">{text}</span>
                <span className="mx-4 font-bold text-xs uppercase tracking-widest text-emerald-500">•</span>
                <span className="mx-4 font-bold text-xs uppercase tracking-widest">{text}</span>
                <span className="mx-4 font-bold text-xs uppercase tracking-widest text-emerald-500">•</span>
                <span className="mx-4 font-bold text-xs uppercase tracking-widest">{text}</span>
                <span className="mx-4 font-bold text-xs uppercase tracking-widest text-emerald-500">•</span>
            </div>
            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default RunningText;
