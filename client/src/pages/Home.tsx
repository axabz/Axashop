import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { ShieldCheck, Zap, Lock, Star, ArrowRight, Search, CheckCircle2, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "circOut" as const
    }
  }
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [clickedProductId, setClickedProductId] = useState<string | null>(null);
  const { data: dbProducts } = trpc.products.list.useQuery();
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  const testProducts = [
  {
    "id": "acc-2025-account",
    "columnId": "Accounts",
    "nameKey": "prod_acc_2025_account_name",
    "descKey": "prod_acc_2025_account_desc",
    "price": "1",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "acc-2024-account",
    "columnId": "Accounts",
    "nameKey": "prod_acc_2024_account_name",
    "descKey": "prod_acc_2024_account_desc",
    "price": "1.5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "acc-2023-account",
    "columnId": "Accounts",
    "nameKey": "prod_acc_2023_account_name",
    "descKey": "prod_acc_2023_account_desc",
    "price": "1.10",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "acc-2022-account",
    "columnId": "Accounts",
    "nameKey": "prod_acc_2022_account_name",
    "descKey": "prod_acc_2022_account_desc",
    "price": "1.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "acc-2021-account",
    "columnId": "Accounts",
    "nameKey": "prod_acc_2021_account_name",
    "descKey": "prod_acc_2021_account_desc",
    "price": "2",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "acc-2020-account",
    "columnId": "Accounts",
    "nameKey": "prod_acc_2020_account_name",
    "descKey": "prod_acc_2020_account_desc",
    "price": "2.45",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "acc-2019-account",
    "columnId": "Accounts",
    "nameKey": "prod_acc_2019_account_name",
    "descKey": "prod_acc_2019_account_desc",
    "price": "3.25",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "acc-2018-account",
    "columnId": "Accounts",
    "nameKey": "prod_acc_2018_account_name",
    "descKey": "prod_acc_2018_account_desc",
    "price": "3.90",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "acc-2017-account",
    "columnId": "Accounts",
    "nameKey": "prod_acc_2017_account_name",
    "descKey": "prod_acc_2017_account_desc",
    "price": "4.90",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "acc-2016-account",
    "columnId": "Accounts",
    "nameKey": "prod_acc_2016_account_name",
    "descKey": "prod_acc_2016_account_desc",
    "price": "10",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "acc-2015-account",
    "columnId": "Accounts",
    "nameKey": "prod_acc_2015_account_name",
    "descKey": "prod_acc_2015_account_desc",
    "price": "53",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "social-netflix",
    "columnId": "Social",
    "nameKey": "prod_social_netflix_name",
    "descKey": "prod_social_netflix_desc",
    "price": "2.35",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "social-prime-video",
    "columnId": "Social",
    "nameKey": "prod_social_prime_video_name",
    "descKey": "prod_social_prime_video_desc",
    "price": "3.15",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "social-hbo-max",
    "columnId": "Social",
    "nameKey": "prod_social_hbo_max_name",
    "descKey": "prod_social_hbo_max_desc",
    "price": "2.45",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "social-disney+-lifetime",
    "columnId": "Social",
    "nameKey": "prod_social_disney+_lifetime_name",
    "descKey": "prod_social_disney+_lifetime_desc",
    "price": "2.40",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "social-crunchyroll-lifetime-[megafan]",
    "columnId": "Social",
    "nameKey": "prod_social_crunchyroll_lifetime_[megafan]_name",
    "descKey": "prod_social_crunchyroll_lifetime_[megafan]_desc",
    "price": "2.55",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "social-paramount+-lifetime",
    "columnId": "Social",
    "nameKey": "prod_social_paramount+_lifetime_name",
    "descKey": "prod_social_paramount+_lifetime_desc",
    "price": "2.70",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "deco-discord-decoration-4.99€",
    "columnId": "Discord",
    "nameKey": "prod_deco_discord_decoration_4.99€_name",
    "descKey": "prod_deco_discord_decoration_4.99€_desc",
    "price": "2.38",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "deco-discord-decoration-5.99€",
    "columnId": "Discord",
    "nameKey": "prod_deco_discord_decoration_5.99€_name",
    "descKey": "prod_deco_discord_decoration_5.99€_desc",
    "price": "2.75",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "deco-discord-decoration-6.99€",
    "columnId": "Discord",
    "nameKey": "prod_deco_discord_decoration_6.99€_name",
    "descKey": "prod_deco_discord_decoration_6.99€_desc",
    "price": "3.10",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "deco-discord-decoration-7.99€",
    "columnId": "Discord",
    "nameKey": "prod_deco_discord_decoration_7.99€_name",
    "descKey": "prod_deco_discord_decoration_7.99€_desc",
    "price": "3.30",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "deco-discord-decoration-8.49€",
    "columnId": "Discord",
    "nameKey": "prod_deco_discord_decoration_8.49€_name",
    "descKey": "prod_deco_discord_decoration_8.49€_desc",
    "price": "3.55",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "deco-discord-decoration-9.99€",
    "columnId": "Discord",
    "nameKey": "prod_deco_discord_decoration_9.99€_name",
    "descKey": "prod_deco_discord_decoration_9.99€_desc",
    "price": "4.05",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "deco-discord-decoration-11.99€",
    "columnId": "Discord",
    "nameKey": "prod_deco_discord_decoration_11.99€_name",
    "descKey": "prod_deco_discord_decoration_11.99€_desc",
    "price": "4.90",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "deco-random-décoration",
    "columnId": "Discord",
    "nameKey": "prod_deco_random_décoration_name",
    "descKey": "prod_deco_random_décoration_desc",
    "price": "2.60",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "vpn-ip-vanish-vpn-1-year",
    "columnId": "VPN",
    "nameKey": "prod_vpn_ip_vanish_vpn_1_year_name",
    "descKey": "prod_vpn_ip_vanish_vpn_1_year_desc",
    "price": "2.25",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "vpn-mullvad-vpn-lifetime",
    "columnId": "VPN",
    "nameKey": "prod_vpn_mullvad_vpn_lifetime_name",
    "descKey": "prod_vpn_mullvad_vpn_lifetime_desc",
    "price": "5.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "vpn-tunnelbear-vpn-lifetime",
    "columnId": "VPN",
    "nameKey": "prod_vpn_tunnelbear_vpn_lifetime_name",
    "descKey": "prod_vpn_tunnelbear_vpn_lifetime_desc",
    "price": "2.30",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "vpn-nord-vpn-lifetime",
    "columnId": "VPN",
    "nameKey": "prod_vpn_nord_vpn_lifetime_name",
    "descKey": "prod_vpn_nord_vpn_lifetime_desc",
    "price": "3.60",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "game-roblox-1000rbx",
    "columnId": "Gaming",
    "nameKey": "prod_game_roblox_1000rbx_name",
    "descKey": "prod_game_roblox_1000rbx_desc",
    "price": "8.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "game-roblox-2000rbx",
    "columnId": "Gaming",
    "nameKey": "prod_game_roblox_2000rbx_name",
    "descKey": "prod_game_roblox_2000rbx_desc",
    "price": "13.80",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "game-roblox-3000rbx",
    "columnId": "Gaming",
    "nameKey": "prod_game_roblox_3000rbx_name",
    "descKey": "prod_game_roblox_3000rbx_desc",
    "price": "17.80",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "game-roblox-4000rbx",
    "columnId": "Gaming",
    "nameKey": "prod_game_roblox_4000rbx_name",
    "descKey": "prod_game_roblox_4000rbx_desc",
    "price": "24.30",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "game-roblox-5000rbx",
    "columnId": "Gaming",
    "nameKey": "prod_game_roblox_5000rbx_name",
    "descKey": "prod_game_roblox_5000rbx_desc",
    "price": "32.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "game-fortnite-5000-v-bucks",
    "columnId": "Gaming",
    "nameKey": "prod_game_fortnite_5000_v_bucks_name",
    "descKey": "prod_game_fortnite_5000_v_bucks_desc",
    "price": "21",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "game-fortnite-13500-v-bucks",
    "columnId": "Gaming",
    "nameKey": "prod_game_fortnite_13500_v_bucks_name",
    "descKey": "prod_game_fortnite_13500_v_bucks_desc",
    "price": "26",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "game-fortnite-27000-v-bucks",
    "columnId": "Gaming",
    "nameKey": "prod_game_fortnite_27000_v_bucks_name",
    "descKey": "prod_game_fortnite_27000_v_bucks_desc",
    "price": "36",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "game-fortnite-40500-v-bucks",
    "columnId": "Gaming",
    "nameKey": "prod_game_fortnite_40500_v_bucks_name",
    "descKey": "prod_game_fortnite_40500_v_bucks_desc",
    "price": "51",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "game-fortnite-54000-v-bucks",
    "columnId": "Gaming",
    "nameKey": "prod_game_fortnite_54000_v_bucks_name",
    "descKey": "prod_game_fortnite_54000_v_bucks_desc",
    "price": "71",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "srv-community-server",
    "columnId": "Servers",
    "nameKey": "prod_srv_community_server_name",
    "descKey": "prod_srv_community_server_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "srv-legal-/-illegal-rp-server",
    "columnId": "Servers",
    "nameKey": "prod_srv_legal_/_illegal_rp_server_name",
    "descKey": "prod_srv_legal_/_illegal_rp_server_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "srv-shop-server",
    "columnId": "Servers",
    "nameKey": "prod_srv_shop_server_name",
    "descKey": "prod_srv_shop_server_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "srv-gaming-server",
    "columnId": "Servers",
    "nameKey": "prod_srv_gaming_server_name",
    "descKey": "prod_srv_gaming_server_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "srv-roleplay-server-server",
    "columnId": "Servers",
    "nameKey": "prod_srv_roleplay_server_server_name",
    "descKey": "prod_srv_roleplay_server_server_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "srv-art-server",
    "columnId": "Servers",
    "nameKey": "prod_srv_art_server_name",
    "descKey": "prod_srv_art_server_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "srv-music-server",
    "columnId": "Servers",
    "nameKey": "prod_srv_music_server_name",
    "descKey": "prod_srv_music_server_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "srv-fitness-server",
    "columnId": "Servers",
    "nameKey": "prod_srv_fitness_server_name",
    "descKey": "prod_srv_fitness_server_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "srv-custom-server",
    "columnId": "Servers",
    "nameKey": "prod_srv_custom_server_name",
    "descKey": "prod_srv_custom_server_desc",
    "price": "0",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "bot-ticket-bot",
    "columnId": "Bots",
    "nameKey": "prod_bot_ticket_bot_name",
    "descKey": "prod_bot_ticket_bot_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "bot-security-bot",
    "columnId": "Bots",
    "nameKey": "prod_bot_security_bot_name",
    "descKey": "prod_bot_security_bot_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "bot-auto-role-bot",
    "columnId": "Bots",
    "nameKey": "prod_bot_auto_role_bot_name",
    "descKey": "prod_bot_auto_role_bot_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "bot-bot-stats-bot",
    "columnId": "Bots",
    "nameKey": "prod_bot_bot_stats_bot_name",
    "descKey": "prod_bot_bot_stats_bot_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "bot-bot-dm-all-bot",
    "columnId": "Bots",
    "nameKey": "prod_bot_bot_dm_all_bot_name",
    "descKey": "prod_bot_bot_dm_all_bot_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "bot-bot-auto-bump-bot",
    "columnId": "Bots",
    "nameKey": "prod_bot_bot_auto_bump_bot_name",
    "descKey": "prod_bot_bot_auto_bump_bot_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "bot-bot-music-bot",
    "columnId": "Bots",
    "nameKey": "prod_bot_bot_music_bot_name",
    "descKey": "prod_bot_bot_music_bot_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "bot-bot-buy-bot",
    "columnId": "Bots",
    "nameKey": "prod_bot_bot_buy_bot_name",
    "descKey": "prod_bot_bot_buy_bot_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "bot-raid-bot-bot",
    "columnId": "Bots",
    "nameKey": "prod_bot_raid_bot_bot_name",
    "descKey": "prod_bot_raid_bot_bot_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "bot-lookup-bot-takayama",
    "columnId": "Bots",
    "nameKey": "prod_bot_lookup_bot_takayama_name",
    "descKey": "prod_bot_lookup_bot_takayama_desc",
    "price": "0",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "bot-bot-hosting",
    "columnId": "Bots",
    "nameKey": "prod_bot_bot_hosting_name",
    "descKey": "prod_bot_bot_hosting_desc",
    "price": "3",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "bot-custom-bot",
    "columnId": "Bots",
    "nameKey": "prod_bot_custom_bot_name",
    "descKey": "prod_bot_custom_bot_desc",
    "price": "0",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "sup-bronze-pack",
    "columnId": "Suppliers",
    "nameKey": "prod_sup_bronze_pack_name",
    "descKey": "prod_sup_bronze_pack_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "sup-gold-pack",
    "columnId": "Suppliers",
    "nameKey": "prod_sup_gold_pack_name",
    "descKey": "prod_sup_gold_pack_desc",
    "price": "10",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "sup-prestige-pack",
    "columnId": "Suppliers",
    "nameKey": "prod_sup_prestige_pack_name",
    "descKey": "prod_sup_prestige_pack_desc",
    "price": "20",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "other-gen-nitro",
    "columnId": "Others",
    "nameKey": "prod_other_gen_nitro_name",
    "descKey": "prod_other_gen_nitro_desc",
    "price": "7.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "other-gen-vcc",
    "columnId": "Others",
    "nameKey": "prod_other_gen_vcc_name",
    "descKey": "prod_other_gen_vcc_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "other-social-media-panel",
    "columnId": "Others",
    "nameKey": "prod_other_social_media_panel_name",
    "descKey": "prod_other_social_media_panel_desc",
    "price": "9.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "other-cc-panel",
    "columnId": "Others",
    "nameKey": "prod_other_cc_panel_name",
    "descKey": "prod_other_cc_panel_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "other-shop/business-training",
    "columnId": "Others",
    "nameKey": "prod_other_shop/business_training_name",
    "descKey": "prod_other_shop/business_training_desc",
    "price": "3",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "other-server-boost-tools",
    "columnId": "Others",
    "nameKey": "prod_other_server_boost_tools_name",
    "descKey": "prod_other_server_boost_tools_desc",
    "price": "4",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "other-phone-lookup",
    "columnId": "Others",
    "nameKey": "prod_other_phone_lookup_name",
    "descKey": "prod_other_phone_lookup_desc",
    "price": "4",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "other-webhooks-spam",
    "columnId": "Others",
    "nameKey": "prod_other_webhooks_spam_name",
    "descKey": "prod_other_webhooks_spam_desc",
    "price": "3",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "other-fake-screen",
    "columnId": "Others",
    "nameKey": "prod_other_fake_screen_name",
    "descKey": "prod_other_fake_screen_desc",
    "price": "3",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "other-vinted-scam-ebook",
    "columnId": "Others",
    "nameKey": "prod_other_vinted_scam_ebook_name",
    "descKey": "prod_other_vinted_scam_ebook_desc",
    "price": "2",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "other-counterfeit-ebook",
    "columnId": "Others",
    "nameKey": "prod_other_counterfeit_ebook_name",
    "descKey": "prod_other_counterfeit_ebook_desc",
    "price": "3",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "other-card-tech-ebook",
    "columnId": "Others",
    "nameKey": "prod_other_card_tech_ebook_name",
    "descKey": "prod_other_card_tech_ebook_desc",
    "price": "2",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "other-dox-template",
    "columnId": "Others",
    "nameKey": "prod_other_dox_template_name",
    "descKey": "prod_other_dox_template_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "other-dox-guide",
    "columnId": "Others",
    "nameKey": "prod_other_dox_guide_name",
    "descKey": "prod_other_dox_guide_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-wakanim",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_wakanim_name",
    "descKey": "prod_tech_tech_wakanim_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-crunchyroll",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_crunchyroll_name",
    "descKey": "prod_tech_tech_crunchyroll_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-localization",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_localization_name",
    "descKey": "prod_tech_tech_localization_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-deezer-premium",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_deezer_premium_name",
    "descKey": "prod_tech_tech_deezer_premium_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-nike",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_nike_name",
    "descKey": "prod_tech_tech_nike_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-netflix",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_netflix_name",
    "descKey": "prod_tech_tech_netflix_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-temp-num",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_temp_num_name",
    "descKey": "prod_tech_tech_temp_num_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-temp-mail",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_temp_mail_name",
    "descKey": "prod_tech_tech_temp_mail_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-tiktok-view-bot",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_tiktok_view_bot_name",
    "descKey": "prod_tech_tech_tiktok_view_bot_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-spotify",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_spotify_name",
    "descKey": "prod_tech_tech_spotify_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-twitch-replay",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_twitch_replay_name",
    "descKey": "prod_tech_tech_twitch_replay_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-unban-apple",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_unban_apple_name",
    "descKey": "prod_tech_tech_unban_apple_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-snap+",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_snap+_name",
    "descKey": "prod_tech_tech_snap+_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-tiktok-certif",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_tiktok_certif_name",
    "descKey": "prod_tech_tech_tiktok_certif_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-steam-all-free-games",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_steam_all_free_games_name",
    "descKey": "prod_tech_tech_steam_all_free_games_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-free-deco",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_free_deco_name",
    "descKey": "prod_tech_tech_free_deco_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-robux",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_robux_name",
    "descKey": "prod_tech_tech_robux_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-ban-insta",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_ban_insta_name",
    "descKey": "prod_tech_tech_ban_insta_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-skype",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_skype_name",
    "descKey": "prod_tech_tech_skype_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-ph-premium",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_ph_premium_name",
    "descKey": "prod_tech_tech_ph_premium_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-4b0s-x",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_4b0s_x_name",
    "descKey": "prod_tech_tech_4b0s_x_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-steam",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_steam_name",
    "descKey": "prod_tech_tech_steam_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-site",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_site_name",
    "descKey": "prod_tech_tech_site_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-nitro-boost",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_nitro_boost_name",
    "descKey": "prod_tech_tech_nitro_boost_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-swap",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_swap_name",
    "descKey": "prod_tech_tech_swap_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-ppl-50€",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_ppl_50€_name",
    "descKey": "prod_tech_tech_ppl_50€_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-brawl-stars",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_brawl_stars_name",
    "descKey": "prod_tech_tech_brawl_stars_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "tech-tech-follow-twitter",
    "columnId": "Tech",
    "nameKey": "prod_tech_tech_follow_twitter_name",
    "descKey": "prod_tech_tech_follow_twitter_desc",
    "price": "4.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "db-discord-database",
    "columnId": "Database",
    "nameKey": "prod_db_discord_database_name",
    "descKey": "prod_db_discord_database_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "db-fivem-database",
    "columnId": "Database",
    "nameKey": "prod_db_fivem_database_name",
    "descKey": "prod_db_fivem_database_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "db-sfr-database",
    "columnId": "Database",
    "nameKey": "prod_db_sfr_database_name",
    "descKey": "prod_db_sfr_database_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "db-free-mobile-database",
    "columnId": "Database",
    "nameKey": "prod_db_free_mobile_database_name",
    "descKey": "prod_db_free_mobile_database_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "db-roblox-database",
    "columnId": "Database",
    "nameKey": "prod_db_roblox_database_name",
    "descKey": "prod_db_roblox_database_desc",
    "price": "5",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "cc-cc-unchecked",
    "columnId": "CC",
    "nameKey": "prod_cc_cc_unchecked_name",
    "descKey": "prod_cc_cc_unchecked_desc",
    "price": "1.75",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "cc-cc-checked-100%-linkable",
    "columnId": "CC",
    "nameKey": "prod_cc_cc_checked_100%_linkable_name",
    "descKey": "prod_cc_cc_checked_100%_linkable_desc",
    "price": "2.50",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    "id": "cc-cc-checked-100%-valid",
    "columnId": "CC",
    "nameKey": "prod_cc_cc_checked_100%_valid_name",
    "descKey": "prod_cc_cc_checked_100%_valid_desc",
    "price": "3.65",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  }
];

  const products = dbProducts && dbProducts.length > 0 ? dbProducts : testProducts;

  // Extraction dynamique des catégories uniques à partir des produits
  const categories = ["All", ...Array.from(new Set(products.map((p: any) => p.columnId.toString())))];

  const filteredProducts = products?.filter((product: any) => {
    const matchesTag = selectedTag === "All" || product.columnId.toString() === selectedTag;
    const productName = (t as any)[product.nameKey] || product.name;
    const matchesSearch = searchQuery === "" || productName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  }) || [];

  return (
    <div className="w-full bg-[#030711] min-h-screen selection:bg-primary/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-medium tracking-wider uppercase text-slate-400">{(t as any).heroBadge}</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-6xl lg:text-8xl font-extrabold tracking-tight leading-[1.05]">
              {(t as any).heroTitle || "Axa Shop"}
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {(t as any).heroDesc}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 pt-4">
              <Button className="h-14 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]">
                {(t as any).exploreCatalog}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Catalogue Section */}
      <section className="py-24 relative">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">{(t as any).collectionTitle || "Notre"} <span className="text-primary">{(t as any).collectionHighlight || "Collection"}</span></h2>
              <p className="text-slate-400 max-w-md">{(t as any).collectionDesc || "Produits premium sélectionnés pour les utilisateurs les plus exigeants."}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder={(t as any).searchPlaceholder || "Rechercher un produit..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-12 w-full sm:w-[300px] bg-white/[0.02] border-white/10 rounded-xl focus:ring-primary/20 focus:border-primary/30 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Tags / Categories */}
          <div className="flex gap-2 flex-wrap mb-12">
            {categories.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTag === tag
                    ? "bg-primary text-white shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]"
                    : "bg-white/[0.03] border border-white/[0.08] text-slate-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {(t as any)["cat_" + tag.toLowerCase()] || tag}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-[2rem] overflow-hidden card-hover group flex flex-col h-full"
              >
                {/* Product Image */}
                <div className="aspect-[4/3] bg-white/[0.02] relative overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={(t as any)[product.nameKey] || product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Layers className="w-12 h-12 text-white/10" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
                    Verified
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 flex flex-col flex-grow space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors truncate">{(t as any)[product.nameKey] || product.name}</h3>
                    <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                      {(t as any)[product.descKey] || product.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-auto flex items-center justify-between border-t border-white/[0.05]">
                    <div className="flex flex-col">
                      <span className="text-xl font-black text-white">
                        {parseFloat(product.price) === 0 ? "Ticket" : `€${parseFloat(product.price).toFixed(2)}`}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => setClickedProductId(clickedProductId === product.id ? null : product.id)}
                      className="bg-white text-black hover:bg-primary hover:text-white font-bold rounded-xl px-5 h-10 transition-all"
                    >
                      {clickedProductId === product.id ? ((t as any).close || "Fermer") : ((t as any).buy || "Acheter")}
                    </Button>
                  </div>
                  
                  {/* Discord Message */}
                  {clickedProductId === product.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="mt-4 p-4 rounded-2xl bg-primary/10 border border-primary/30 backdrop-blur-sm"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                          </svg>
                        </div>
                        <div className="flex-1 space-y-2">
                          <p className="text-sm font-semibold text-white leading-relaxed">
                            {(t as any).discordTicketMsg || "Pour obtenir ce produit, veuillez créer un ticket sur notre serveur Discord !"}
                          </p>
                          <a
                            href="https://discord.gg/4R8rxgvE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                            </svg>
                            {(t as any).joinDiscord || "Rejoindre Discord"}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-24 glass-card rounded-[3rem]">
              <div className="w-20 h-20 bg-white/[0.02] border border-white/[0.08] rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{(t as any).noProductFound || "Aucun produit trouvé"}</h3>
              <p className="text-slate-400">{(t as any).noProductDesc || "Essayez d'ajuster votre recherche ou votre catégorie."}</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container">
          <div className="glass-card rounded-[3rem] p-12 lg:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[100px] -z-10" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl lg:text-5xl font-bold leading-tight">{(t as any).trustTitle || "Construit sur la"} <span className="text-primary">{(t as any).trustHighlight || "Confiance"}</span> {(t as any).trustAndSecurity || "& la Sécurité"}</h2>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    {(t as any).trustDesc || "Nous avons traité des milliers de transactions avec un taux de satisfaction exceptionnel. Notre infrastructure est conçue pour la rapidité et la sécurité absolue."}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: (t as any).statActiveUsers || "Utilisateurs Actifs", value: "12k+" },
                    { label: (t as any).statTotalSales || "Ventes Totales", value: "50k+" },
                    { label: (t as any).statSupport || "Support", value: "24/7" },
                    { label: (t as any).statUptime || "Uptime", value: "99.9%" }
                  ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                      <p className="text-2xl font-black text-white">{stat.value}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-blue-600/20 border border-white/10 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                  <ShieldCheck className="w-32 h-32 text-primary animate-pulse-slow relative z-10" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-10 left-10 p-4 glass-card rounded-2xl animate-bounce-slow">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="absolute bottom-10 right-10 p-4 glass-card rounded-2xl animate-bounce-slow delay-700">
                    <Lock className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
