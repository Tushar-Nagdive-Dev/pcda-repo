function UpdateGalleryFillForm() {
    const { galleryId } = useParams(); // Extract galleryId from URL
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    console.log('Gallery ID:', galleryId);
  
    if (!galleryId) {
      return <div>Error: Gallery ID is missing in the URL.</div>;
    }
  
    const form = useForm({
      resolver: zodResolver(GalleryFormValidation),
      defaultValues: {
        event_name: '',
        type: '',
        year: '',
        active: false,
        gallery: [{ image: null, title: '', year: '', status: '' }],
      },
    });
  
    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: 'gallery',
    });
  
    // Fetch gallery details by ID
    useEffect(() => {
      const fetchGalleryById = async () => {
        try {
          const response = await apiClient.get(`/gallery/${galleryId}`);
          const data = response.data;
  
          form.reset({
            event_name: data.eventName,
            type: data.type,
            year: data.year,
            active: data.isActive,
            gallery: data.uploadFileIds.map((fileId) => ({
              image: null,
              title: '',
              year: data.year,
              status: data.isActive ? 'active' : 'inactive',
            })),
          });
          setLoading(false);
        } catch (err) {
          console.error('Error fetching gallery:', err);
          setError('Failed to fetch gallery details.');
          setLoading(false);
        }
      };
  
      fetchGalleryById();
    }, [galleryId, form]);
  
    const onSubmit = async (values) => {
      try {
        const updatedData = {
          eventName: values.event_name,
          type: values.type.toUpperCase(),
          year: values.year,
          isActive: values.active,
          uploadFileIds: values.gallery.map((item) => item.fileId),
        };
  
        await apiClient.put(`/gallery/${galleryId}`, updatedData);
        alert('Gallery updated successfully!');
      } catch (err) {
        console.error('Error updating gallery:', err);
        alert('Failed to update gallery. Please try again.');
      }
    };
  
    if (loading) {
      return <div>Loading gallery details...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
      <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
        <h3 className="font-raleway text-2xl text-center font-bold">Update Gallery</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Form fields here */}
            <Button type="submit">Update Gallery</Button>
          </form>
        </Form>
      </div>
    );
  }
  
  export default UpdateGalleryFillForm;
  