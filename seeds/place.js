const mongoose = require("mongoose");
const Place = require("../models/place");
const place = require("../models/place");

mongoose
  .connect("mongodb://127.0.0.1/bestpoints")
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

async function seedPlaces() {
  const places = [
    {
      title: "Taman Mini Indonesia Indah",
      price: 20000,
      description:
        "Taman hiburan keluarga dengan berbagai replika bangunan dari seluruh Indonesia",
      location: "Taman Mini Indonesia Indah, Jakarta",
      image:
        "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8ODJ8MTA1NDc2ODR8fGVufDB8fHx8fA%3D%3D/1280x720",
    },
    {
      title: "Pantai Kuta",
      price: 0,
      description:
        "Pantai yang terkenal di Bali dengan pemandangan sunset yang indah",
      location: "Pantai Kuta, Kuta, Badung Regency, Bali",
      image:
        "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8ODZ8MTA1NDc2ODR8fGVufDB8fHx8fA%3D%3D/1280x720",
    },
    {
      title: "Borobudur",
      price: 0,
      description:
        "Candi Buddha terbesar di dunia yang terletak di Magelang, Jawa Tengah",
      location: "Borobudur, Magelang, Central Java",
      image:
        "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OTF8MTA1NDc2ODR8fGVufDB8fHx8fA%3D%3D/1280x720",
    },
    {
      title: "Kawah Putih",
      price: 0,
      description:
        "Kawah vulkanik dengan danau berwarna putih di Bandung, Jawa Barat",
      location: "Kawah Putih, Ciwidey, West Java",
      image:
        "https://images.unsplash.com/photo-1482401204742-eb3c31c24722?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTA4fDEwNTQ3Njg0fHxlbnwwfHx8fHw%3D/1280x720",
    },
    {
      title: "Malioboro",
      price: 0,
      description:
        "Jalan utama di Yogyakarta dengan berbagai toko dan kuliner khas",
      location: "Jl. Malioboro, Yogyakarta City, Special Region of Yogyakarta",
      image:
        "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTE2fDEwNTQ3Njg0fHxlbnwwfHx8fHw%3D/1280x720",
    },
    {
      title: "Pantai Tanjung Aan",
      price: 10000,
      description:
        "Pantai dengan pasir berwarna putih dan air laut yang jernih di Lombok, Nusa Tenggara Barat",
      location: "Pantai Tanjung Aan, Lombok, West Nusa Tenggara",
      image:
        "https://images.unsplash.com/photo-1542379950-b3fc716c16f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTE0fDEwNTQ3Njg0fHxlbnwwfHx8fHw%3D/1280x720",
    },
    {
      title: "Bukit Bintang",
      price: 0,
      description: "Kawasan perbelanjaan dan hiburan di Kuala Lumpur, Malaysia",
      location:
        "Bukit Bintang, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
      image:
        "https://images.unsplash.com/photo-1507840771025-26e8ececa04c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTEyfDEwNTQ3Njg0fHxlbnwwfHx8fHw%3D/1280x720",
    },
    {
      title: "Candi Prambanan",
      price: 25000,
      description:
        "Candi Hindu terbesar di Indonesia yang terletak di Yogyakarta",
      location: "Candi Prambanan, Sleman, Special Region of Yogyakarta",
      image:
        "https://images.unsplash.com/photo-1621869606578-1561708a7e09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FuZGklMjBwcmFtYmFuYW58ZW58MHx8MHx8fDA%3D/1280x720",
    },
    {
      title: "Danau Toba",
      price: 0,
      description:
        "Danau vulkanik terbesar di Indonesia yang terletak di Sumatera Utara",
      location: "Danau Toba, North Sumatra",
      image:
        "https://images.unsplash.com/photo-1445265005361-ae273d6a1e16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTA2fDEwNTQ3Njg0fHxlbnwwfHx8fHw%3D/1280x720",
    },
    {
      title: "Kawah Ijen",
      price: 100000,
      description:
        "Kawah vulkanik dengan fenomena blue fire di Banyuwangi, Jawa Timur",
      location: "Kawah Ijen, Banyuwangi, East Java",
      image:
        "https://images.unsplash.com/photo-1536146094120-8d7fcbc4c45b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2F3YWglMjBpamVufGVufDB8fDB8fHww/1280x720",
    },
    {
      title: "Pantai Sanur",
      price: 0,
      description:
        "Pantai di Bali yang cocok untuk berenang dan melihat matahari terbit",
      location: "Pantai Sanur, Denpasar, Bali",
      image:
        "https://images.unsplash.com/photo-1513178532803-0d3db9cf7696?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OTh8MTA1NDc2ODR8fGVufDB8fHx8fA%3D%3D/1280x720",
    },

    {
      title: "Candi Borobudur",
      price: 25000,
      description:
        "Candi Buddha terbesar di dunia yang terletak di Magelang, Jawa Tengah",
      location: "Candi Borobudur, Borobudur, Magelang, Central Java",
      image:
        "https://images.unsplash.com/photo-1502747812021-0ae746b6c23f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OTV8MTA1NDc2ODR8fGVufDB8fHx8fA%3D%3D/1280x720",
    },
    {
      title: "Pulau Komodo",
      price: 5000000,
      description:
        "Pulau di Indonesia yang terkenal dengan komodo, hewan terbesar di dunia",
      location: "Pulau Komodo, East Nusa Tenggara",
      image:
        "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8ODF8MTA1NDc2ODR8fGVufDB8fHx8fA%3D%3D/1280x720",
    },
    {
      title: "Taman Nasional Gunung Rinjani",
      price: 150000,
      description:
        "Taman nasional yang terletak di Lombok dan memiliki gunung tertinggi kedua di Indonesia",
      location: "Taman Nasional Gunung Rinjani, Lombok, West Nusa Tenggara",
      image:
        "https://images.unsplash.com/photo-1535063406830-27dfae54262a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8ODR8MTA1NDc2ODR8fGVufDB8fHx8fA%3D%3D/1280x720",
    },
    {
      title: "Bukit Tinggi",
      price: 0,
      description:
        "Kota kecil yang terletak di Sumatera Barat dengan arsitektur khas Eropa",
      location: "Bukit Tinggi, West Sumatra",
      image:
        "https://images.unsplash.com/photo-1434025697302-54853b8da166?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NzB8MTA1NDc2ODR8fGVufDB8fHx8fA%3D%3D/1280x720",
    },
    {
      title: "Pulau Weh",
      price: 0,
      description:
        "Pulau yang terletak di ujung barat Indonesia dengan keindahan bawah laut yang luar biasa",
      location: "Pulau Weh, Sabang, Aceh",
      image:
        "https://images.unsplash.com/photo-1590423203582-e7f7968d8807?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mzd8MTA1NDc2ODR8fGVufDB8fHx8fA%3D%3D/1280x720",
    },
    {
      title: "Taman Safari Indonesia",
      price: 0,
      description:
        "Taman hiburan keluarga dengan berbagai satwa liar di Cisarua, Bogor",
      location: "Taman Safari Indonesia, Cisarua, West Java",
      image:
        "https://images.unsplash.com/photo-1557214530-b023b9f45344?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NDd8MTA1NDc2ODR8fGVufDB8fHx8fA%3D%3D/1280x720",
    },
    {
      title: "Gunung Merbabu",
      price: 50000,
      description:
        "Gunung yang terletak di Jawa Tengah dengan pemandangan matahari terbit yang indah",
      location: "Gunung Merbabu, Central Java",
      image:
        "https://images.unsplash.com/photo-1590397883410-ddccd55ef3d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjJ8MTA1NDc2ODR8fGVufDB8fHx8fA%3D%3D/1280x720",
    },
    {
      title: "Pulau Lombok",
      price: 0,
      description:
        "Pulau di Indonesia yang terkenal dengan keindahan pantainya",
      location: "Pulau Lombok, West Nusa Tenggara",
      image:
        "https://images.unsplash.com/photo-1475754073691-4423e1368422?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTl8MTA1NDc2ODR8fGVufDB8fHx8fA%3D%3D/1280x720",
    },
    {
      title: "Tanjung Lesung",
      price: 100000,
      description:
        "Kawasan wisata pantai di Banten yang cocok untuk bersantai dan berenang",
      location: "Tanjung Lesung, Pandeglang, Banten",
      image:
        "https://images.unsplash.com/photo-1496086363406-27fbdabb8593?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTR8MTA1NDc2ODR8fGVufDB8fHx8fA%3D%3D/1280x720",
    },
  ];

  try {
    const newPlace = places.map((place) => {
      return { ...place, author: "68610ed635d0f2308a445561" };
    });
    await Place.deleteMany({});
    await Place.insertMany(newPlace);
    console.log("Data berhasil disimpan");
  } catch (err) {
    console.log("Terjadi kesalahan saat menyimpan data:", err);
  } finally {
    mongoose.disconnect();
  }
}

seedPlaces();
